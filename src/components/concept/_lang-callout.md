
:::tip 
Semgrep’s {props.name} coverage leverages framework-specific analysis capabilities that are not present in Semgrep Community Edition (Semgrep CE). As a result, many framework specific Pro rules will **fail** to return findings if run on Semgrep CE. To ensure full security coverage, run: `semgrep login && semgrep ci`.
:::
