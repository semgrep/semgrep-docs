import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs
    defaultValue="gh-gl"
    values={[
    {label: 'GitHub or GitLab', value: 'gh-gl'},
    {label: 'SSO', value: 'sso'},
    ]}
>

<TabItem value='gh-gl'>

To join an existing org using your GitHub or GitLab credentials:

1. Sign in to [<i class="fas fa-external-link fa-xs"></i> Semgrep AppSec Platform](https://semgrep.dev/login) with the account credentials specified by your admin.
1. Follow the on-screen prompts to grant Semgrep the needed permissions and proceed. This creates your **personal** Semgrep account.
1. Click the organization name displayed at the top of the **navigation bar** to expand the drop-down menu.
1. Click **Add org > Join an organization**.
1. Provide the name of the organization you'd like to join. Then, click **Join**.

</TabItem>

<TabItem value='sso'>

To join an existing org through your SSO provider:

1. Sign in to [<i class="fas fa-external-link fa-xs"></i> Semgrep AppSec Platform](https://semgrep.dev/login) with the account credentials specified by your admin.
2. You are automatically signed in to all organizations that your admin has set up for you.

</TabItem>

</Tabs>
