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

To join an existing org in GitHub or GitLab:

1. Sign in to [<i class="fas fa-external-link fa-xs"></i> Semgrep AppSec Platform](https://semgrep.dev/login) with the account credentials specified by your admin.
1. Follow the on-screen prompts to [grant Semgrep the needed permissions](/deployment/checklist/#permissions) and proceed. This creates your **personal** Semgrep account.
1. Click **Join an existing organization**.
1. Click your organization's name. The web app signs you in to your organization's Semgrep account.

</TabItem>

<TabItem value='sso'>

To join an existing org through your SSO provider:

1. Sign in to [<i class="fas fa-external-link fa-xs"></i> Semgrep AppSec Platform](https://semgrep.dev/login) with the account credentials specified by your admin.
2. You are automatically signed in to all organizations that your admin has set up for you.

</TabItem>

</Tabs>
