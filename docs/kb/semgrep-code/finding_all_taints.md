# Why isn’t Semgrep reporting all my tainted data flows?  

You've started testing your source/code samples against Semgrep to see how good taint mode in engine is.  But you find some but not all taints are reported.  

One of the reasons to reconcile lower than expected taints could be the principle of reporting on shortest paths only.  

## Background

By default, Semgrep will report a tainted source-sink permutation only once and the permutation which traverses the shortest path.  Any path traversals that demonstrate the same source-sink permutation longer than the shortest path are precluded from reporting. 

## Analysis

Let's take a look at these two examples: 

Call stack 1:

```
File2 function2(sourceA) 
      >> File1 function1(sourceA/sinkB)
```

Call stack 2: 

```
File 1 function4(sourceA) 
       >> function3(sourceA) 
          >> function2(sourceA) 
             >> function1(sourceA/sinkB)
```

Even though the  path traversal is 4 in call stack 2 and even in the same file/translational unit, Semgrep will report a dataflow taint only against call stack 1, which has a shorter path and is the same sourceA/sinkB taint.  


There isn't any configuration to tweak to achieve the 4 --> 1 traversal, rather it's more a case of achieving cardinality here, placing the same type of taint in the same bucket regardless of path traversal.  This affords much more efficient and intelligible findings triage: you are inspecting only unique findings.  This is especially useful for languages with polymorphic classes that can flare the reporting for a singleton taint.  

### Some assumptions: 

* Interfile analysis is used: the `--pro` flag is specified for either the`semgrep scan` or `semgprep ci` command.

* If only intrafile/interprocedural analysis is performed (`--pro-intrafile`), Semgrep would have reported the taint against call stack 2.

Be mindful of the scope you are specifying for the scan, from the `semgrep scan --help` or `semgrep ci --help` pages:

```
Semgrep Pro Engine options: 
    --pro                         Inter-file analysis and Pro languages (currently just
                                  Apex). Requires Semgrep Pro Engine, contact
                                  support@r2c.dev for more information on this.
    --pro-intrafile               Intra-file inter-procedural taint analysis. Implies
                                  --pro-languages. Requires Semgrep Pro Engine, contact
                                  support@r2c.dev for more information on this.
```



## Best practices:

In the nascent phases of your Semgrep rollout, we recommend to test against all your test cases for interfile coverage in taint mode, that the Semgrep engine can indeed track a source to a sink transcending across files and functions.  To completely exhaust the scope, start with the shortest path and then change the implementation such that the source is no longer in the scope of the shortest path and repeat this until you have achieved the longest, targeted path traversal.  This is assuming you are also specifying to `--pro` to cover the greatest atomicity across files.  

### Dry runs

You will also view a dataflow graphic representation in the UI for a taint finding, though we recommend running dry-run scans first, so that you can experiment without uploading results:

```semgrep scan --pro --dataflow-traces --config=.  .....```

Run locally via the CLI like this, any reported findings in the run will not be uploaded into the Semgrep App; historical tracking is turned off in this fashion.  Following this process, you are achieving safe testing and not confounding any ad hoc information of tracked findings.

Once you have established Semgrep correctly and comprehensively covers all your taint mode use cases across translation units, you can then turn off the flag: `--dataflow-traces` and reintroduce your original code. 


#### Sample taint data-flow reporting


With the ``--dataflow-traces`` turned on, you can review the taint's dataflow via the CLI scan session's findings and here is an example that traverses across multiple files, demonstrating interfile functionality:

```

test2.java
    test-spring-insecure-bean-validation
     Passing user input to context.buildConstraintViolationWithTemplate() function may lead to
     execution of arbitary commands.

      8┆ context.buildConstraintViolationWithTemplate(template).addConstraintViolation();

      Taint comes from:
       test1.java
      128┆  @Override
      129┆
      130┆   public boolean isValid1234(MessageParticipantsDto messageParticipantsDto,         
ConstraintValidatorContext context) {

      Taint flows through these intermediate variables:
       test1.java
      130┆  public boolean isValid1234(MessageParticipantsDto messageParticipantsDto,
 ConstraintValidatorContext context) {

      This is how taint reaches the sink:
       test1.java
      156┆      return ValidationUtil.buildTemplate(context, templateList);
      Taint flows through these intermediate variables:
       5┆ public boolean buildTemplate(ConstraintValidatorContext context, List<String> templateList) {
      then reaches:
       8┆ context.buildConstraintViolationWithTemplate(template).addConstraintViolation();

```

