To add a Semgrep job to your CI provider:

1. Ensure you are signed in to Semgrep Cloud Platform.
1. Click **[Projects](https://semgrep.dev/orgs/-/projects)** on the left sidebar.
1. Click **Scan new project > CI/CD**.
1. Click the name of the CI provider you use. You are taken to the **Add job** page.
1. Follow the steps provided on the page. The process varies depending on your CI provider, but generally includes the following steps:
    1. Click **Create new token** to create a `SEMGREP_APP_TOKEN`, which is used to when sending results to Semgrep Cloud Platform.
    1. Copy and paste the `SEMGREP_APP_TOKEN` and its value. Store it as an environment variable or secret in your CI provider. 
    1. Optional: Click **Review CI config** to see Semgrep's default YAML configuration file for your CI provider.
    1. Click **Copy snippet** and paste it into your CI provider's configuration file (the filename is typically indicated in the page). Depending on your CI provider, you may have to create a custom configuration file or use an existing one.
    1. Commit the configuration file to your repository.
    1. Return to Semgrep Cloud Platform and click **Check connection**.

You have now added a Semgrep job to your CI provider; this starts your first full Semgrep scan. Its findings are sent to Semgrep Cloud Platform for triage and remediation.
