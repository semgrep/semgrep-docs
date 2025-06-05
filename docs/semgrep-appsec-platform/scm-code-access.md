# Source Code Manager Code Access
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Certain Semgrep features require different levels of code access on the Source Code Manager (SCM).

This table shows the minimum required code access scopes for each supported SCM, separated by read and write operations.

#### Required SCM Code Access Scopes
| SCM Type | Read Access | Write Access |
|----------|-------------|--------------|
| Azure DevOps | `code:read` | `code:write` |
| Bitbucket | `repository:read`, `pullrequest:read` | `repository:write`, `pullrequest:write` |
| Bitbucket Data Center | `repository:read` | `repository:write` |
| GitHub & Github Enterprise | `contents:read` | `contents:write` |
| GitLab & Gitlab Self-managed | `read_repository` | `write_repository` |

## Granting Code Access

### With a private GitHub app

If you already have a private Semgrep GitHub app that does not have code access then you can follow these steps to update the app to grant code access to Semgrep.

:::info For GitHub Enterprise
Replace `https://github.com` with the base URL of your GitHub Enterprise instance.
:::

If you do not know the name of your app slug, you can find it on the Source Code Manager Settings page. 

1. Navigate to the GitHub Application permissions and events page

    a. For Organization account: 
        `https://github.com/organizations/{organization}/settings/apps/{appSlug}/permissions`
        
    b. For User account: `https://github.com/settings/apps/{appSlug}/permissions`

2. Expand `Repository Permissions`
3. Ensure the `Read Access`/`Write Access` scopes listed in [Required SCM Code Access Scopes](/semgrep-appsec-platform/scm-code-access#required-scm-code-access-scopes) are set.
4. Click `Save Changes`.
5. GitHub will send you (or your admin) an email to approve the updated permissions. Once approved, code access will be enabled.

### With an access token

If you onboarded your SCM repositories using an access token then you can follow these steps to grant code access to Semgrep.

<Tabs
    defaultValue="github"
    values={[
    {label: 'Azure DevOps Cloud', value: 'ado'},
    {label: 'Bitbucket Cloud', value: 'bitbucket'},
    {label: 'Bitbucket Cloud', value: 'bitbucket_datacenter'},
    {label: 'GitHub', value: 'github'},
    {label: 'GitLab', value: 'gitlab'},
    ]}
>
    <TabItem value="ado">
    1. Navigate to the Azure Devops access token settings page: `https://dev.azure.com/{organization}/_usersSettings/tokens`

    2. Create a new access token and ensure the `Read Access`/`Write Access` scopes listed in [Required SCM Code Access Scopes](/semgrep-appsec-platform/scm-code-access#required-scm-code-access-scopes) are set.

    3. Back on the Semgrep Source Code Manager Settings page, click `Update access token` for the specific organization, paste in the new access token, and click `Save`.
    </TabItem>
    
    <TabItem value="bitbucket">
    1. Navigate to the Bitbucket Cloud access token settings page: `https://bitbucket.org/{workspace}/workspace/settings/access-keys`

    2. Create a new access token and ensure the `Read Access`/`Write Access` scopes listed in [Required SCM Code Access Scopes](/semgrep-appsec-platform/scm-code-access#required-scm-code-access-scopes) are set.

    3. Back on the Semgrep Source Code Manager Settings page, click `Update access token` for the specific workspace, paste in the new access token, and click `Save`.
    </TabItem>
    
    <TabItem value="bitbucket_datacenter">
    1. Navigate to the Bitbucket Data Center access token settings page: `{BitBucket base URL}/plugins/servlet/access-tokens/projects/${project}/manage`

    2. Create a new access token and ensure the `Read Access`/`Write Access` scopes listed in [Required SCM Code Access Scopes](/semgrep-appsec-platform/scm-code-access#required-scm-code-access-scopes) are set.

    3. Back on the Semgrep Source Code Manager Settings page, click `Update access token` for the specific project, paste in the new access token, and click `Save`.
    </TabItem>
    
    <TabItem value="github">
    :::info For GitHub Enterprise
    Replace `https://github.com` with the base URL of your GitHub Enterprise instance.
    :::

    1. Navigate to the GitHub personal access token settings page: `https://github.com/settings/personal-access-tokens`

    2. Create a new access token and ensure the `Read Access`/`Write Access` scopes listed in [Required SCM Code Access Scopes](/semgrep-appsec-platform/scm-code-access#required-scm-code-access-scopes) are set.

    3. Back on the Semgrep Source Code Manager Settings page, click `Update access token` for the specific organization, paste in the new access token, and click `Save`.
    </TabItem>
    
    <TabItem value="gitlab">
    :::info For GitHub Enterprise
    Replace `https://gitlab.com` with the base URL of your GitLab Self-managed instance.
    :::

    1. Navigate to the GitLab access token settings page: `https://gitlab.com/groups/{group}/-/settings/access_tokens`

    2. Create a new access token and ensure the `Read Access`/`Write Access` scopes listed in [Required SCM Code Access Scopes](/semgrep-appsec-platform/scm-code-access#required-scm-code-access-scopes) are set.

    3. Back on the Semgrep Source Code Manager Settings page, click `Update access token` for the specific group, paste in the new access token, and click `Save`.

    </TabItem>
</Tabs>
