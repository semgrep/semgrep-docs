# Why isn’t Semgrep reporting all my tainted data flows?  

One of the reasons behind seeing fewer than expected tainted data flows could be the principle of reporting on shortest paths only.

By default, Semgrep reports a tainted source-sink permutation only once and reports the data flow that traverses the shortest path. Any longer paths with the same source-sink combination are not shown.

## Analysis of two tainted data flows

Take a look at these two examples: 

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

### Interfile analysis

If both tainted data flows are identified in the same scan, and the scan has interfile analysis enabled (`--pro`, or Pro Engine enabled in the Cloud Platform), only Call stack 1 is reported as a finding. It has a shorter path, and has the same sourceA -> sinkB taint.

This speeds up triage by ensuring you are only reviewing unique findings. It's especially useful for languages with polymorphic classes that can add noise for a singleton taint.  

### Intrafile analysis

If only intrafile / interprocedural analysis is performed (`--pro-intrafile`), Semgrep only reports a finding for call stack 2. Call stack 1 would not be identified, because it crosses file boundaries.

## Best practices for testing tainted data flows

To understand in greater detail how Semgrep detects tainted data flows, you can use your own test cases to review different paths.

### Dry runs

To avoid sending test data to Semgrep Cloud Platform and potentially confounding existing findings, use `semgrep scan` or `semgrep ci --dry-run`. 

When testing locally, adding `--dataflow-traces` allows you to see the taint traces as you would in the Semgrep Cloud Platform UI.

#### Sample taint data-flow reporting

The following is an example that shows dataflow traces traversing multiple files, demonstrating interfile taint tracking:

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

### Changing Pro analysis options

You can change whether you are using the `--pro` or `--pro-intrafile` option depending on the exact flow you're testing, as described in the preceding section, [Analysis of two tainted data flows](#analysis-of-two-tainted-data-flows).

### Altering the paths

To ensure you see all the flow options, start by testing the shortest path and then change the code so that the shortest path is no longer tainted. Repeat this until you have achieved the longest taint flow path you want to test. 

