---
slug: pagination
title: How to paginate responses from the Semgrep API
hide_title: true
description: Learn how to paginate responses from the Semgrep API.
tags:
  - Deployment
---

# How to paginate responses from the Semgrep API

Semgrep's API endpoints use both offset-based pagination and cursor-based pagination.

## Offset-based pagination

Offset-based pagination defines a **limit** to specify the number of entries fetched and **offset** to indicate where to start collecting data, which correspond to the `page_size` and `page` query parameters described in this section.

The following API endpoints support offset-based pagination:

- [List all projects](https://semgrep.dev/api/v1/docs/#tag/Project/operation/semgrep_app.saas.handlers.repository.openapi_list_recent_projects)
- [List code or supply chain findings](https://semgrep.dev/api/v1/docs/#tag/Finding/operation/semgrep_app.core_exp.findings.handlers.issue.openapi_list_recent_issues)

For these endpoints, include the following query parameters to paginate through results:

| Query parameter | Type | Description |
| - | - | - |
| `page` | integer | The page of results to return. Page numbering begins at `0`. Default: `0`|
| `page_size` | integer | The maximum number of records returned per page. Default: `100`. |

### Example

To request a list of Code or Supply Chain findings, specifically the second page where each page contains 100 items, make a cURL call as follows:

```console
curl 'https://semgrep.dev/api/v1/deployments/YOUR_DEPLOYMENT_SLUG/findings?page=2&page_size=100' \
--header 'Authorization: Bearer YOUR_API_TOKEN'
```

## Cursor-based pagination

The [List Secrets](https://semgrep.dev/api/v1/docs/#tag/SecretsService/operation/semgrep_app.products.secrets.handlers.issue.list_issues_conexxion) endpoint supports cursor-based pagination:

For these endpoints, include the following query parameters to paginate through results.

| Query parameter | Type | Description |
| - | - | - |
| `cursor` | string | Cursor to paginate through the results. Provide the cursor value from the response to retrieve the next or previous page. |
| `limit` | integer | Page size to paginate through the results. |

### Example

To request a list of Secrets, make a cURL call as follows:

```console
# modify the limit value to change the page size
curl 'https://semgrep.dev/api/v1/deployments/YOUR_DEPLOYMENT_ID/secrets?cursor=&limit=25' \
--header 'Authorization: Bearer YOUR_API_TOKEN'
```

The response includes the `cursor` attribute. Save the value returned with `cursor`, and provide it in subsequent calls to retrieve additional pages:

```console
curl 'https://semgrep.dev/api/v1/deployments/20169/secrets?cursor=Pm...3D&limit=25' \
--header 'Authorization: Bearer YOUR_API_TOKEN'
```

Repeat this process for additional pages.

## Mixed pagination

The following API endpoints support mixed usages of page- and cursor-based pagination:

- [List repositories with dependencies](https://semgrep.dev/api/v1/docs/#tag/SupplyChainService/operation/semgrep_app.products.sca.handlers.dependency.list_repositories_for_dependencies_conexxion)
- [List lockfiles in a given repository with dependencies](https://semgrep.dev/api/v1/docs/#tag/SupplyChainService/operation/semgrep_app.products.sca.handlers.dependency.list_lockfiles_for_dependencies_conexxion)
- [List dependencies](https://semgrep.dev/api/v1/docs/#tag/SupplyChainService/operation/semgrep_app.products.sca.handlers.dependency.list_dependencies_conexxion)

### Example

To request a list of repositories with dependencies, make a call to the following URL. Adjust `page_size` accordingly:

```console
curl 'https://semgrep.dev/api/v1/deployments/YOUR_DEPLOYMENT_ID/dependencies/repositories' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer YOUR_API_TOKEN' \
--data '{
    "page_size": 5
}'
```

The API returns `cursor` as part of the response:

```console
{
    ...
    "cursor": 1097374
}
```

Add the `cursor` key-value pair to the JSON body of subsequent calls to obtain additional pages:

```console
curl 'https://semgrep.dev/api/v1/deployments/YOUR_DEPLOYMENT_ID/dependencies/repositories' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer YOUR_API_TOKEN' \
--data '{
    "page_size": 1,
    "cursor": 1097374
}'
```