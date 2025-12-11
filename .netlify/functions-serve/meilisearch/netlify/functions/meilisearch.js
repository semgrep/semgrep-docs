var __getOwnPropNames = Object.getOwnPropertyNames;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};

// node_modules/meilisearch/dist/cjs/index.cjs
var require_cjs = __commonJS({
  "node_modules/meilisearch/dist/cjs/index.cjs"(exports2) {
    "use strict";
    Object.defineProperties(exports2, { __esModule: { value: true }, [Symbol.toStringTag]: { value: "Module" } });
    var MatchingStrategies = {
      ALL: "all",
      LAST: "last",
      FREQUENCY: "frequency"
    };
    var ContentTypeEnum = {
      JSON: "application/json",
      CSV: "text/csv",
      NDJSON: "application/x-ndjson"
    };
    var ErrorStatusCode = {
      /** @see https://www.meilisearch.com/docs/reference/errors/error_codes#index_creation_failed */
      INDEX_CREATION_FAILED: "index_creation_failed",
      /** @see https://www.meilisearch.com/docs/reference/errors/error_codes#missing_index_uid */
      MISSING_INDEX_UID: "missing_index_uid",
      /** @see https://www.meilisearch.com/docs/reference/errors/error_codes#index_already_exists */
      INDEX_ALREADY_EXISTS: "index_already_exists",
      /** @see https://www.meilisearch.com/docs/reference/errors/error_codes#index_not_found */
      INDEX_NOT_FOUND: "index_not_found",
      /** @see https://www.meilisearch.com/docs/reference/errors/error_codes#invalid_index_uid */
      INVALID_INDEX_UID: "invalid_index_uid",
      /** @see https://www.meilisearch.com/docs/reference/errors/error_codes#index_not_accessible */
      INDEX_NOT_ACCESSIBLE: "index_not_accessible",
      /** @see https://www.meilisearch.com/docs/reference/errors/error_codes#invalid_index_offset */
      INVALID_INDEX_OFFSET: "invalid_index_offset",
      /** @see https://www.meilisearch.com/docs/reference/errors/error_codes#invalid_index_limit */
      INVALID_INDEX_LIMIT: "invalid_index_limit",
      /** @see https://www.meilisearch.com/docs/reference/errors/error_codes#invalid_state */
      INVALID_STATE: "invalid_state",
      /** @see https://www.meilisearch.com/docs/reference/errors/error_codes#primary_key_inference_failed */
      PRIMARY_KEY_INFERENCE_FAILED: "primary_key_inference_failed",
      /** @see https://www.meilisearch.com/docs/reference/errors/error_codes#index_primary_key_already_exists */
      INDEX_PRIMARY_KEY_ALREADY_EXISTS: "index_primary_key_already_exists",
      /** @see https://www.meilisearch.com/docs/reference/errors/error_codes#invalid_index_primary_key */
      INVALID_INDEX_PRIMARY_KEY: "invalid_index_primary_key",
      /** @see https://www.meilisearch.com/docs/reference/errors/error_codes#max_fields_limit_exceeded */
      DOCUMENTS_FIELDS_LIMIT_REACHED: "document_fields_limit_reached",
      /** @see https://www.meilisearch.com/docs/reference/errors/error_codes#missing_document_id */
      MISSING_DOCUMENT_ID: "missing_document_id",
      /** @see https://www.meilisearch.com/docs/reference/errors/error_codes#missing_document_id */
      INVALID_DOCUMENT_ID: "invalid_document_id",
      /** @see https://www.meilisearch.com/docs/reference/errors/error_codes#invalid_content_type */
      INVALID_CONTENT_TYPE: "invalid_content_type",
      /** @see https://www.meilisearch.com/docs/reference/errors/error_codes#missing_content_type */
      MISSING_CONTENT_TYPE: "missing_content_type",
      /** @see https://www.meilisearch.com/docs/reference/errors/error_codes#invalid_document_fields */
      INVALID_DOCUMENT_FIELDS: "invalid_document_fields",
      /** @see https://www.meilisearch.com/docs/reference/errors/error_codes#invalid_document_limit */
      INVALID_DOCUMENT_LIMIT: "invalid_document_limit",
      /** @see https://www.meilisearch.com/docs/reference/errors/error_codes#invalid_document_offset */
      INVALID_DOCUMENT_OFFSET: "invalid_document_offset",
      /** @see https://www.meilisearch.com/docs/reference/errors/error_codes#invalid_document_filter */
      INVALID_DOCUMENT_FILTER: "invalid_document_filter",
      /** @see https://www.meilisearch.com/docs/reference/errors/error_codes#missing_document_filter */
      MISSING_DOCUMENT_FILTER: "missing_document_filter",
      /** @see https://www.meilisearch.com/docs/reference/errors/error_codes#invalid_document_vectors_field */
      INVALID_DOCUMENT_VECTORS_FIELD: "invalid_document_vectors_field",
      /** @see https://www.meilisearch.com/docs/reference/errors/error_codes#payload_too_large */
      PAYLOAD_TOO_LARGE: "payload_too_large",
      /** @see https://www.meilisearch.com/docs/reference/errors/error_codes#missing_payload */
      MISSING_PAYLOAD: "missing_payload",
      /** @see https://www.meilisearch.com/docs/reference/errors/error_codes#malformed_payload */
      MALFORMED_PAYLOAD: "malformed_payload",
      /** @see https://www.meilisearch.com/docs/reference/errors/error_codes#no_space_left_on_device */
      NO_SPACE_LEFT_ON_DEVICE: "no_space_left_on_device",
      /** @see https://www.meilisearch.com/docs/reference/errors/error_codes#invalid_store_file */
      INVALID_STORE_FILE: "invalid_store_file",
      /** @see https://www.meilisearch.com/docs/reference/errors/error_codes#invalid_ranking_rules */
      INVALID_RANKING_RULES: "missing_document_id",
      /** @see https://www.meilisearch.com/docs/reference/errors/error_codes#invalid_request */
      INVALID_REQUEST: "invalid_request",
      /** @see https://www.meilisearch.com/docs/reference/errors/error_codes#invalid_document_geo_field */
      INVALID_DOCUMENT_GEO_FIELD: "invalid_document_geo_field",
      /** @see https://www.meilisearch.com/docs/reference/errors/error_codes#invalid_search_q */
      INVALID_SEARCH_Q: "invalid_search_q",
      /** @see https://www.meilisearch.com/docs/reference/errors/error_codes#invalid_search_offset */
      INVALID_SEARCH_OFFSET: "invalid_search_offset",
      /** @see https://www.meilisearch.com/docs/reference/errors/error_codes#invalid_search_limit */
      INVALID_SEARCH_LIMIT: "invalid_search_limit",
      /** @see https://www.meilisearch.com/docs/reference/errors/error_codes#invalid_search_page */
      INVALID_SEARCH_PAGE: "invalid_search_page",
      /** @see https://www.meilisearch.com/docs/reference/errors/error_codes#invalid_search_hits_per_page */
      INVALID_SEARCH_HITS_PER_PAGE: "invalid_search_hits_per_page",
      /** @see https://www.meilisearch.com/docs/reference/errors/error_codes#invalid_search_attributes_to_retrieve */
      INVALID_SEARCH_ATTRIBUTES_TO_RETRIEVE: "invalid_search_attributes_to_retrieve",
      /** @see https://www.meilisearch.com/docs/reference/errors/error_codes#invalid_search_attributes_to_crop */
      INVALID_SEARCH_ATTRIBUTES_TO_CROP: "invalid_search_attributes_to_crop",
      /** @see https://www.meilisearch.com/docs/reference/errors/error_codes#invalid_search_crop_length */
      INVALID_SEARCH_CROP_LENGTH: "invalid_search_crop_length",
      /** @see https://www.meilisearch.com/docs/reference/errors/error_codes#invalid_search_attributes_to_highlight */
      INVALID_SEARCH_ATTRIBUTES_TO_HIGHLIGHT: "invalid_search_attributes_to_highlight",
      /** @see https://www.meilisearch.com/docs/reference/errors/error_codes#invalid_search_show_matches_position */
      INVALID_SEARCH_SHOW_MATCHES_POSITION: "invalid_search_show_matches_position",
      /** @see https://www.meilisearch.com/docs/reference/errors/error_codes#invalid_search_filter */
      INVALID_SEARCH_FILTER: "invalid_search_filter",
      /** @see https://www.meilisearch.com/docs/reference/errors/error_codes#invalid_search_sort */
      INVALID_SEARCH_SORT: "invalid_search_sort",
      /** @see https://www.meilisearch.com/docs/reference/errors/error_codes#invalid_search_facets */
      INVALID_SEARCH_FACETS: "invalid_search_facets",
      /** @see https://www.meilisearch.com/docs/reference/errors/error_codes#invalid_search_highlight_pre_tag */
      INVALID_SEARCH_HIGHLIGHT_PRE_TAG: "invalid_search_highlight_pre_tag",
      /** @see https://www.meilisearch.com/docs/reference/errors/error_codes#invalid_search_highlight_post_tag */
      INVALID_SEARCH_HIGHLIGHT_POST_TAG: "invalid_search_highlight_post_tag",
      /** @see https://www.meilisearch.com/docs/reference/errors/error_codes#invalid_search_crop_marker */
      INVALID_SEARCH_CROP_MARKER: "invalid_search_crop_marker",
      /** @see https://www.meilisearch.com/docs/reference/errors/error_codes#invalid_search_matching_strategy */
      INVALID_SEARCH_MATCHING_STRATEGY: "invalid_search_matching_strategy",
      /** @see https://www.meilisearch.com/docs/reference/errors/error_codes#invalid_search_vector */
      INVALID_SEARCH_VECTOR: "invalid_search_vector",
      /** @see https://www.meilisearch.com/docs/reference/errors/error_codes#invalid_search_attributes_to_search_on */
      INVALID_SEARCH_ATTRIBUTES_TO_SEARCH_ON: "invalid_search_attributes_to_search_on",
      /** @see https://www.meilisearch.com/docs/reference/errors/error_codes#bad_request */
      BAD_REQUEST: "bad_request",
      /** @see https://www.meilisearch.com/docs/reference/errors/error_codes#document_not_found */
      DOCUMENT_NOT_FOUND: "document_not_found",
      /** @see https://www.meilisearch.com/docs/reference/errors/error_codes#internal */
      INTERNAL: "internal",
      /** @see https://www.meilisearch.com/docs/reference/errors/error_codes#invalid_api_key */
      INVALID_API_KEY: "invalid_api_key",
      /** @see https://www.meilisearch.com/docs/reference/errors/error_codes#invalid_api_key_description */
      INVALID_API_KEY_DESCRIPTION: "invalid_api_key_description",
      /** @see https://www.meilisearch.com/docs/reference/errors/error_codes#invalid_api_key_actions */
      INVALID_API_KEY_ACTIONS: "invalid_api_key_actions",
      /** @see https://www.meilisearch.com/docs/reference/errors/error_codes#invalid_api_key_indexes */
      INVALID_API_KEY_INDEXES: "invalid_api_key_indexes",
      /** @see https://www.meilisearch.com/docs/reference/errors/error_codes#invalid_api_key_expires_at */
      INVALID_API_KEY_EXPIRES_AT: "invalid_api_key_expires_at",
      /** @see https://www.meilisearch.com/docs/reference/errors/error_codes#api_key_not_found */
      API_KEY_NOT_FOUND: "api_key_not_found",
      /** @see https://www.meilisearch.com/docs/reference/errors/error_codes#immutable_api_key_uid */
      IMMUTABLE_API_KEY_UID: "immutable_api_key_uid",
      /** @see https://www.meilisearch.com/docs/reference/errors/error_codes#immutable_api_key_actions */
      IMMUTABLE_API_KEY_ACTIONS: "immutable_api_key_actions",
      /** @see https://www.meilisearch.com/docs/reference/errors/error_codes#immutable_api_key_indexes */
      IMMUTABLE_API_KEY_INDEXES: "immutable_api_key_indexes",
      /** @see https://www.meilisearch.com/docs/reference/errors/error_codes#immutable_api_key_expires_at */
      IMMUTABLE_API_KEY_EXPIRES_AT: "immutable_api_key_expires_at",
      /** @see https://www.meilisearch.com/docs/reference/errors/error_codes#immutable_api_key_created_at */
      IMMUTABLE_API_KEY_CREATED_AT: "immutable_api_key_created_at",
      /** @see https://www.meilisearch.com/docs/reference/errors/error_codes#immutable_api_key_updated_at */
      IMMUTABLE_API_KEY_UPDATED_AT: "immutable_api_key_updated_at",
      /** @see https://www.meilisearch.com/docs/reference/errors/error_codes#missing_authorization_header */
      MISSING_AUTHORIZATION_HEADER: "missing_authorization_header",
      /** @see https://www.meilisearch.com/docs/reference/errors/error_codes#unretrievable_document */
      UNRETRIEVABLE_DOCUMENT: "unretrievable_document",
      /** @see https://www.meilisearch.com/docs/reference/errors/error_codes#database_size_limit_reached */
      MAX_DATABASE_SIZE_LIMIT_REACHED: "database_size_limit_reached",
      /** @see https://www.meilisearch.com/docs/reference/errors/error_codes#task_not_found */
      TASK_NOT_FOUND: "task_not_found",
      /** @see https://www.meilisearch.com/docs/reference/errors/error_codes#dump_process_failed */
      DUMP_PROCESS_FAILED: "dump_process_failed",
      /** @see https://www.meilisearch.com/docs/reference/errors/error_codes#dump_not_found */
      DUMP_NOT_FOUND: "dump_not_found",
      /** @see https://www.meilisearch.com/docs/reference/errors/error_codes#invalid_swap_duplicate_index_found */
      INVALID_SWAP_DUPLICATE_INDEX_FOUND: "invalid_swap_duplicate_index_found",
      /** @see https://www.meilisearch.com/docs/reference/errors/error_codes#invalid_swap_indexes */
      INVALID_SWAP_INDEXES: "invalid_swap_indexes",
      /** @see https://www.meilisearch.com/docs/reference/errors/error_codes#missing_swap_indexes */
      MISSING_SWAP_INDEXES: "missing_swap_indexes",
      /** @see https://www.meilisearch.com/docs/reference/errors/error_codes#missing_master_key */
      MISSING_MASTER_KEY: "missing_master_key",
      /** @see https://www.meilisearch.com/docs/reference/errors/error_codes#invalid_task_types */
      INVALID_TASK_TYPES: "invalid_task_types",
      /** @see https://www.meilisearch.com/docs/reference/errors/error_codes#invalid_task_uids */
      INVALID_TASK_UIDS: "invalid_task_uids",
      /** @see https://www.meilisearch.com/docs/reference/errors/error_codes#invalid_task_statuses */
      INVALID_TASK_STATUSES: "invalid_task_statuses",
      /** @see https://www.meilisearch.com/docs/reference/errors/error_codes#invalid_task_limit */
      INVALID_TASK_LIMIT: "invalid_task_limit",
      /** @see https://www.meilisearch.com/docs/reference/errors/error_codes#invalid_task_from */
      INVALID_TASK_FROM: "invalid_task_from",
      /** @see https://www.meilisearch.com/docs/reference/errors/error_codes#invalid_task_canceled_by */
      INVALID_TASK_CANCELED_BY: "invalid_task_canceled_by",
      /** @see https://www.meilisearch.com/docs/reference/errors/error_codes#missing_task_filters */
      MISSING_TASK_FILTERS: "missing_task_filters",
      /** @see https://www.meilisearch.com/docs/reference/errors/error_codes#too_many_open_files */
      TOO_MANY_OPEN_FILES: "too_many_open_files",
      /** @see https://www.meilisearch.com/docs/reference/errors/error_codes#io_error */
      IO_ERROR: "io_error",
      /** @see https://www.meilisearch.com/docs/reference/errors/error_codes#invalid_task_index_uids */
      INVALID_TASK_INDEX_UIDS: "invalid_task_index_uids",
      /** @see https://www.meilisearch.com/docs/reference/errors/error_codes#immutable_index_uid */
      IMMUTABLE_INDEX_UID: "immutable_index_uid",
      /** @see https://www.meilisearch.com/docs/reference/errors/error_codes#immutable_index_created_at */
      IMMUTABLE_INDEX_CREATED_AT: "immutable_index_created_at",
      /** @see https://www.meilisearch.com/docs/reference/errors/error_codes#immutable_index_updated_at */
      IMMUTABLE_INDEX_UPDATED_AT: "immutable_index_updated_at",
      /** @see https://www.meilisearch.com/docs/reference/errors/error_codes#invalid_settings_displayed_attributes */
      INVALID_SETTINGS_DISPLAYED_ATTRIBUTES: "invalid_settings_displayed_attributes",
      /** @see https://www.meilisearch.com/docs/reference/errors/error_codes#invalid_settings_searchable_attributes */
      INVALID_SETTINGS_SEARCHABLE_ATTRIBUTES: "invalid_settings_searchable_attributes",
      /** @see https://www.meilisearch.com/docs/reference/errors/error_codes#invalid_settings_filterable_attributes */
      INVALID_SETTINGS_FILTERABLE_ATTRIBUTES: "invalid_settings_filterable_attributes",
      /** @see https://www.meilisearch.com/docs/reference/errors/error_codes#invalid_settings_sortable_attributes */
      INVALID_SETTINGS_SORTABLE_ATTRIBUTES: "invalid_settings_sortable_attributes",
      /** @see https://www.meilisearch.com/docs/reference/errors/error_codes#invalid_settings_ranking_rules */
      INVALID_SETTINGS_RANKING_RULES: "invalid_settings_ranking_rules",
      /** @see https://www.meilisearch.com/docs/reference/errors/error_codes#invalid_settings_stop_words */
      INVALID_SETTINGS_STOP_WORDS: "invalid_settings_stop_words",
      /** @see https://www.meilisearch.com/docs/reference/errors/error_codes#invalid_settings_synonyms */
      INVALID_SETTINGS_SYNONYMS: "invalid_settings_synonyms",
      /** @see https://www.meilisearch.com/docs/reference/errors/error_codes#invalid_settings_distinct_attribute */
      INVALID_SETTINGS_DISTINCT_ATTRIBUTE: "invalid_settings_distinct_attribute",
      /** @see https://www.meilisearch.com/docs/reference/errors/error_codes#invalid_settings_typo_tolerance */
      INVALID_SETTINGS_TYPO_TOLERANCE: "invalid_settings_typo_tolerance",
      /** @see https://www.meilisearch.com/docs/reference/errors/error_codes#invalid_settings_faceting */
      INVALID_SETTINGS_FACETING: "invalid_settings_faceting",
      /** @see https://www.meilisearch.com/docs/reference/errors/error_codes#invalid_settings_pagination */
      INVALID_SETTINGS_PAGINATION: "invalid_settings_pagination",
      /** @see https://www.meilisearch.com/docs/reference/errors/error_codes#invalid_settings_search_cutoff_ms */
      INVALID_SETTINGS_SEARCH_CUTOFF_MS: "invalid_settings_search_cutoff_ms",
      /** @see https://www.meilisearch.com/docs/reference/errors/error_codes#invalid_settings_search_cutoff_ms */
      INVALID_SETTINGS_LOCALIZED_ATTRIBUTES: "invalid_settings_localized_attributes",
      /** @see https://www.meilisearch.com/docs/reference/errors/error_codes#invalid_task_before_enqueued_at */
      INVALID_TASK_BEFORE_ENQUEUED_AT: "invalid_task_before_enqueued_at",
      /** @see https://www.meilisearch.com/docs/reference/errors/error_codes#invalid_task_after_enqueued_at */
      INVALID_TASK_AFTER_ENQUEUED_AT: "invalid_task_after_enqueued_at",
      /** @see https://www.meilisearch.com/docs/reference/errors/error_codes#invalid_task_before_started_at */
      INVALID_TASK_BEFORE_STARTED_AT: "invalid_task_before_started_at",
      /** @see https://www.meilisearch.com/docs/reference/errors/error_codes#invalid_task_after_started_at */
      INVALID_TASK_AFTER_STARTED_AT: "invalid_task_after_started_at",
      /** @see https://www.meilisearch.com/docs/reference/errors/error_codes#invalid_task_before_finished_at */
      INVALID_TASK_BEFORE_FINISHED_AT: "invalid_task_before_finished_at",
      /** @see https://www.meilisearch.com/docs/reference/errors/error_codes#invalid_task_after_finished_at */
      INVALID_TASK_AFTER_FINISHED_AT: "invalid_task_after_finished_at",
      /** @see https://www.meilisearch.com/docs/reference/errors/error_codes#missing_api_key_actions */
      MISSING_API_KEY_ACTIONS: "missing_api_key_actions",
      /** @see https://www.meilisearch.com/docs/reference/errors/error_codes#missing_api_key_indexes */
      MISSING_API_KEY_INDEXES: "missing_api_key_indexes",
      /** @see https://www.meilisearch.com/docs/reference/errors/error_codes#missing_api_key_expires_at */
      MISSING_API_KEY_EXPIRES_AT: "missing_api_key_expires_at",
      /** @see https://www.meilisearch.com/docs/reference/errors/error_codes#invalid_api_key_limit */
      INVALID_API_KEY_LIMIT: "invalid_api_key_limit",
      /** @see https://www.meilisearch.com/docs/reference/errors/error_codes#invalid_api_key_offset */
      INVALID_API_KEY_OFFSET: "invalid_api_key_offset",
      /** @see https://www.meilisearch.com/docs/reference/errors/error_codes#invalid_facet_search_facet_name */
      INVALID_FACET_SEARCH_FACET_NAME: "invalid_facet_search_facet_name",
      /** @see https://www.meilisearch.com/docs/reference/errors/error_codes#missing_facet_search_facet_name */
      MISSING_FACET_SEARCH_FACET_NAME: "missing_facet_search_facet_name",
      /** @see https://www.meilisearch.com/docs/reference/errors/error_codes#invalid_facet_search_facet_query */
      INVALID_FACET_SEARCH_FACET_QUERY: "invalid_facet_search_facet_query",
      /** @see https://www.meilisearch.com/docs/reference/errors/error_codes#invalid_search_ranking_score_threshold */
      INVALID_SEARCH_RANKING_SCORE_THRESHOLD: "invalid_search_ranking_score_threshold",
      /** @see https://www.meilisearch.com/docs/reference/errors/error_codes#invalid_similar_ranking_score_threshold */
      INVALID_SIMILAR_RANKING_SCORE_THRESHOLD: "invalid_similar_ranking_score_threshold"
    };
    var MeiliSearchError = class extends Error {
      name = "MeiliSearchError";
    };
    var MeiliSearchApiError = class extends MeiliSearchError {
      name = "MeiliSearchApiError";
      cause;
      response;
      constructor(response, responseBody) {
        super(
          responseBody?.message ?? `${response.status}: ${response.statusText}`
        );
        this.response = response;
        if (responseBody !== void 0) {
          this.cause = responseBody;
        }
      }
    };
    var MeiliSearchRequestError = class extends MeiliSearchError {
      name = "MeiliSearchRequestError";
      constructor(url, cause) {
        super(`Request to ${url} has failed`, { cause });
      }
    };
    var MeiliSearchRequestTimeOutError = class extends MeiliSearchError {
      name = "MeiliSearchRequestTimeOutError";
      cause;
      constructor(timeout, requestInit) {
        super(`request timed out after ${timeout}ms`);
        this.cause = { timeout, requestInit };
      }
    };
    var MeiliSearchTaskTimeOutError = class extends MeiliSearchError {
      name = "MeiliSearchTaskTimeOutError";
      cause;
      constructor(taskUid, timeout) {
        super(
          `timeout of ${timeout}ms has exceeded on task ${taskUid} when waiting for it to be resolved.`
        );
        this.cause = { taskUid, timeout };
      }
    };
    var version = "0.53.0";
    var pkg = {
      version
    };
    function addProtocolIfNotPresent(host) {
      if (!(host.startsWith("https://") || host.startsWith("http://"))) {
        return `http://${host}`;
      }
      return host;
    }
    function addTrailingSlash(url) {
      if (!url.endsWith("/")) {
        url += "/";
      }
      return url;
    }
    function appendRecordToURLSearchParams(searchParams, recordToAppend) {
      for (const [key, val] of Object.entries(recordToAppend)) {
        if (val != null) {
          searchParams.set(
            key,
            Array.isArray(val) ? val.join() : val instanceof Date ? val.toISOString() : String(val)
          );
        }
      }
    }
    function getHeaders(config, headersInit) {
      const agentHeader = "X-Meilisearch-Client";
      const packageAgent = `Meilisearch JavaScript (v${pkg.version})`;
      const contentType = "Content-Type";
      const authorization = "Authorization";
      const headers = new Headers(headersInit);
      if (config.apiKey && !headers.has(authorization)) {
        headers.set(authorization, `Bearer ${config.apiKey}`);
      }
      if (!headers.has(contentType)) {
        headers.set(contentType, "application/json");
      }
      if (config.clientAgents !== void 0) {
        const clients = config.clientAgents.concat(packageAgent);
        headers.set(agentHeader, clients.join(" ; "));
      } else {
        headers.set(agentHeader, packageAgent);
      }
      return headers;
    }
    var TIMEOUT_ID$1 = Symbol("<timeout>");
    function getTimeoutFn(requestInit, ms) {
      const { signal } = requestInit;
      const ac = new AbortController();
      if (signal != null) {
        let acSignalFn = null;
        if (signal.aborted) {
          ac.abort(signal.reason);
        } else {
          const fn = () => ac.abort(signal.reason);
          signal.addEventListener("abort", fn, { once: true });
          acSignalFn = () => signal.removeEventListener("abort", fn);
          ac.signal.addEventListener("abort", acSignalFn, { once: true });
        }
        return () => {
          if (signal.aborted) {
            return;
          }
          const to = setTimeout(() => ac.abort(TIMEOUT_ID$1), ms);
          const fn = () => {
            clearTimeout(to);
            if (acSignalFn !== null) {
              ac.signal.removeEventListener("abort", acSignalFn);
            }
          };
          signal.addEventListener("abort", fn, { once: true });
          return () => {
            signal.removeEventListener("abort", fn);
            fn();
          };
        };
      }
      requestInit.signal = ac.signal;
      return () => {
        const to = setTimeout(() => ac.abort(TIMEOUT_ID$1), ms);
        return () => clearTimeout(to);
      };
    }
    var HttpRequests = class {
      #url;
      #requestInit;
      #customRequestFn;
      #requestTimeout;
      constructor(config) {
        const host = addTrailingSlash(addProtocolIfNotPresent(config.host));
        try {
          this.#url = new URL(host);
        } catch (error) {
          throw new MeiliSearchError("The provided host is not valid", {
            cause: error
          });
        }
        this.#requestInit = {
          ...config.requestInit,
          headers: getHeaders(config, config.requestInit?.headers)
        };
        this.#customRequestFn = config.httpClient;
        this.#requestTimeout = config.timeout;
      }
      /**
       * Combines provided extra {@link RequestInit} headers, provided content type
       * and class instance RequestInit headers, prioritizing them in this order.
       *
       * @returns A new Headers object or the main headers of this class if no
       *   headers are provided
       */
      #getHeaders(extraHeaders, contentType) {
        if (extraHeaders === void 0 && contentType === void 0) {
          return this.#requestInit.headers;
        }
        const headers = new Headers(extraHeaders);
        if (contentType !== void 0 && !headers.has("Content-Type")) {
          headers.set("Content-Type", contentType);
        }
        for (const [key, val] of this.#requestInit.headers) {
          if (!headers.has(key)) {
            headers.set(key, val);
          }
        }
        return headers;
      }
      /**
       * Prepares common request parameters (URL and RequestInit).
       *
       * @returns Object containing the prepared URL and RequestInit
       */
      #prepareRequest({
        path,
        method,
        params,
        contentType,
        body,
        extraRequestInit
      }) {
        const url = new URL(path, this.#url);
        if (params !== void 0) {
          appendRecordToURLSearchParams(url.searchParams, params);
        }
        const init = {
          method,
          body: contentType === void 0 || typeof body !== "string" ? JSON.stringify(body) : body,
          ...extraRequestInit,
          ...this.#requestInit,
          headers: this.#getHeaders(extraRequestInit?.headers, contentType)
        };
        return { url, init };
      }
      /**
       * Sends a request with {@link fetch} or a custom HTTP client, combining
       * parameters and class properties.
       *
       * @returns A promise containing the response
       */
      async #request(options) {
        const { url, init } = this.#prepareRequest(options);
        const startTimeout = this.#requestTimeout !== void 0 ? getTimeoutFn(init, this.#requestTimeout) : null;
        const stopTimeout = startTimeout?.();
        let response;
        let responseBody;
        try {
          if (this.#customRequestFn !== void 0) {
            return await this.#customRequestFn(url, init);
          }
          response = await fetch(url, init);
          responseBody = await response.text();
        } catch (error) {
          throw new MeiliSearchRequestError(
            url.toString(),
            Object.is(error, TIMEOUT_ID$1) ? new MeiliSearchRequestTimeOutError(this.#requestTimeout, init) : error
          );
        } finally {
          stopTimeout?.();
        }
        const parsedResponse = responseBody === "" ? void 0 : JSON.parse(responseBody);
        if (!response.ok) {
          throw new MeiliSearchApiError(
            response,
            parsedResponse
          );
        }
        return parsedResponse;
      }
      /** Request with GET. */
      get(options) {
        return this.#request(options);
      }
      /** Request with POST. */
      post(options) {
        return this.#request({ ...options, method: "POST" });
      }
      /** Request with PUT. */
      put(options) {
        return this.#request({ ...options, method: "PUT" });
      }
      /** Request with PATCH. */
      patch(options) {
        return this.#request({ ...options, method: "PATCH" });
      }
      /** Request with DELETE. */
      delete(options) {
        return this.#request({ ...options, method: "DELETE" });
      }
      /** Request with POST that returns a stream. */
      postStream(options) {
        return this.#requestStream({ ...options, method: "POST" });
      }
      /**
       * Sends a request that returns a ReadableStream for streaming responses.
       *
       * @returns A promise containing the response stream
       */
      async #requestStream(options) {
        const { url, init } = this.#prepareRequest(options);
        const startTimeout = this.#requestTimeout !== void 0 ? getTimeoutFn(init, this.#requestTimeout) : null;
        const stopTimeout = startTimeout?.();
        let response;
        try {
          if (this.#customRequestFn !== void 0) {
            const result = await this.#customRequestFn(url, init);
            if (!(result instanceof ReadableStream)) {
              throw new MeiliSearchError(
                "Custom HTTP client must return a ReadableStream for streaming requests"
              );
            }
            return result;
          }
          response = await fetch(url, init);
        } catch (error) {
          throw new MeiliSearchRequestError(
            url.toString(),
            Object.is(error, TIMEOUT_ID$1) ? new MeiliSearchRequestTimeOutError(this.#requestTimeout, init) : error
          );
        } finally {
          stopTimeout?.();
        }
        if (!response.ok) {
          const responseBody = await response.text();
          const parsedResponse = responseBody === "" ? void 0 : JSON.parse(responseBody);
          throw new MeiliSearchApiError(response, parsedResponse);
        }
        if (!response.body) {
          throw new MeiliSearchError(
            "Response body is null - server did not return a readable stream"
          );
        }
        return response.body;
      }
    };
    var TIMEOUT_ID = Symbol("<task timeout>");
    function getWaitTaskApplier(taskClient) {
      return function(enqueuedTaskPromise) {
        return Object.defineProperty(
          enqueuedTaskPromise,
          "waitTask",
          {
            async value(waitOptions) {
              return await taskClient.waitForTask(
                await enqueuedTaskPromise,
                waitOptions
              );
            }
          }
        );
      };
    }
    var getTaskUid = (taskUidOrEnqueuedTask) => typeof taskUidOrEnqueuedTask === "number" ? taskUidOrEnqueuedTask : taskUidOrEnqueuedTask.taskUid;
    var TaskClient = class {
      #httpRequest;
      #defaultTimeout;
      #defaultInterval;
      #applyWaitTask;
      constructor(httpRequest, defaultWaitOptions) {
        this.#httpRequest = httpRequest;
        this.#defaultTimeout = defaultWaitOptions?.timeout ?? 5e3;
        this.#defaultInterval = defaultWaitOptions?.interval ?? 50;
        this.#applyWaitTask = getWaitTaskApplier(this);
      }
      /** {@link https://www.meilisearch.com/docs/reference/api/tasks#get-one-task} */
      async getTask(uid, extraRequestInit) {
        return await this.#httpRequest.get({
          path: `tasks/${uid}`,
          extraRequestInit
        });
      }
      /** {@link https://www.meilisearch.com/docs/reference/api/tasks#get-tasks} */
      async getTasks(params) {
        return await this.#httpRequest.get({ path: "tasks", params });
      }
      /**
       * Wait for an enqueued task to be processed. This is done through polling
       * with {@link TaskClient.getTask}.
       *
       * @remarks
       * If an {@link EnqueuedTask} needs to be awaited instantly, it is recommended
       * to instead use {@link EnqueuedTaskPromise.waitTask}, which is available on
       * any method that returns an {@link EnqueuedTaskPromise}.
       */
      async waitForTask(taskUidOrEnqueuedTask, options) {
        const taskUid = getTaskUid(taskUidOrEnqueuedTask);
        const timeout = options?.timeout ?? this.#defaultTimeout;
        const interval = options?.interval ?? this.#defaultInterval;
        const ac = timeout > 0 ? new AbortController() : null;
        const toId = ac !== null ? setTimeout(() => void ac.abort(TIMEOUT_ID), timeout) : void 0;
        try {
          for (; ; ) {
            const task = await this.getTask(taskUid, { signal: ac?.signal });
            if (task.status !== "enqueued" && task.status !== "processing") {
              clearTimeout(toId);
              return task;
            }
            if (interval > 0) {
              await new Promise((resolve) => setTimeout(resolve, interval));
            }
          }
        } catch (error) {
          throw Object.is(error.cause, TIMEOUT_ID) ? new MeiliSearchTaskTimeOutError(taskUid, timeout) : error;
        }
      }
      /**
       * Lazily wait for multiple enqueued tasks to be processed.
       *
       * @remarks
       * In this case {@link WaitOptions.timeout} is the maximum time to wait for any
       * one task, not for all of the tasks to complete.
       */
      async *waitForTasksIter(taskUidsOrEnqueuedTasks, options) {
        for await (const taskUidOrEnqueuedTask of taskUidsOrEnqueuedTasks) {
          yield await this.waitForTask(taskUidOrEnqueuedTask, options);
        }
      }
      /** Wait for multiple enqueued tasks to be processed. */
      async waitForTasks(...params) {
        const tasks = [];
        for await (const task of this.waitForTasksIter(...params)) {
          tasks.push(task);
        }
        return tasks;
      }
      /** {@link https://www.meilisearch.com/docs/reference/api/tasks#cancel-tasks} */
      cancelTasks(params) {
        return this.#applyWaitTask(
          this.#httpRequest.post({ path: "tasks/cancel", params })
        );
      }
      /** {@link https://www.meilisearch.com/docs/reference/api/tasks#delete-tasks} */
      deleteTasks(params) {
        return this.#applyWaitTask(
          this.#httpRequest.delete({ path: "tasks", params })
        );
      }
    };
    function getHttpRequestsWithEnqueuedTaskPromise(httpRequest, taskClient) {
      const applyWaitTask = getWaitTaskApplier(taskClient);
      return {
        post: (...params) => applyWaitTask(httpRequest.post(...params)),
        put: (...params) => applyWaitTask(httpRequest.put(...params)),
        patch: (...params) => applyWaitTask(httpRequest.patch(...params)),
        delete: (...params) => applyWaitTask(httpRequest.delete(...params))
      };
    }
    var Index = class {
      uid;
      primaryKey;
      createdAt;
      updatedAt;
      httpRequest;
      tasks;
      #httpRequestsWithTask;
      /**
       * @param config - Request configuration options
       * @param uid - UID of the index
       * @param primaryKey - Primary Key of the index
       */
      constructor(config, uid, primaryKey) {
        this.uid = uid;
        this.primaryKey = primaryKey;
        this.httpRequest = new HttpRequests(config);
        this.tasks = new TaskClient(this.httpRequest, config.defaultWaitOptions);
        this.#httpRequestsWithTask = getHttpRequestsWithEnqueuedTaskPromise(
          this.httpRequest,
          this.tasks
        );
      }
      ///
      /// SEARCH
      ///
      /**
       * Search for documents into an index
       *
       * @param query - Query string
       * @param options - Search options
       * @param config - Additional request configuration options
       * @returns Promise containing the search response
       */
      async search(query, options, extraRequestInit) {
        return await this.httpRequest.post({
          path: `indexes/${this.uid}/search`,
          body: { q: query, ...options },
          extraRequestInit
        });
      }
      /**
       * Search for documents into an index using the GET method
       *
       * @param query - Query string
       * @param options - Search options
       * @param config - Additional request configuration options
       * @returns Promise containing the search response
       */
      async searchGet(query, options, extraRequestInit) {
        const parseFilter = (filter) => {
          if (typeof filter === "string") return filter;
          else if (Array.isArray(filter))
            throw new MeiliSearchError(
              "The filter query parameter should be in string format when using searchGet"
            );
          else return void 0;
        };
        const getParams = {
          q: query,
          ...options,
          filter: parseFilter(options?.filter),
          sort: options?.sort?.join(","),
          facets: options?.facets?.join(","),
          attributesToRetrieve: options?.attributesToRetrieve?.join(","),
          attributesToCrop: options?.attributesToCrop?.join(","),
          attributesToHighlight: options?.attributesToHighlight?.join(","),
          vector: options?.vector?.join(","),
          attributesToSearchOn: options?.attributesToSearchOn?.join(",")
        };
        return await this.httpRequest.get({
          path: `indexes/${this.uid}/search`,
          params: getParams,
          extraRequestInit
        });
      }
      /**
       * Search for facet values
       *
       * @param params - Parameters used to search on the facets
       * @param config - Additional request configuration options
       * @returns Promise containing the search response
       */
      async searchForFacetValues(params, extraRequestInit) {
        return await this.httpRequest.post({
          path: `indexes/${this.uid}/facet-search`,
          body: params,
          extraRequestInit
        });
      }
      /**
       * Search for similar documents
       *
       * @param params - Parameters used to search for similar documents
       * @returns Promise containing the search response
       */
      async searchSimilarDocuments(params) {
        return await this.httpRequest.post({
          path: `indexes/${this.uid}/similar`,
          body: params
        });
      }
      ///
      /// INDEX
      ///
      /**
       * Get index information.
       *
       * @returns Promise containing index information
       */
      async getRawInfo() {
        const res = await this.httpRequest.get({
          path: `indexes/${this.uid}`
        });
        this.primaryKey = res.primaryKey;
        this.updatedAt = new Date(res.updatedAt);
        this.createdAt = new Date(res.createdAt);
        return res;
      }
      /**
       * Fetch and update Index information.
       *
       * @returns Promise to the current Index object with updated information
       */
      async fetchInfo() {
        await this.getRawInfo();
        return this;
      }
      /**
       * Get Primary Key.
       *
       * @returns Promise containing the Primary Key of the index
       */
      async fetchPrimaryKey() {
        this.primaryKey = (await this.getRawInfo()).primaryKey;
        return this.primaryKey;
      }
      /**
       * Create an index.
       *
       * @param uid - Unique identifier of the Index
       * @param options - Index options
       * @param config - Request configuration options
       * @returns Newly created Index object
       */
      static create(uid, options = {}, config) {
        const httpRequests = new HttpRequests(config);
        return getHttpRequestsWithEnqueuedTaskPromise(
          httpRequests,
          new TaskClient(httpRequests)
        ).post({
          path: "indexes",
          body: { ...options, uid }
        });
      }
      /**
       * Update an index.
       *
       * @param data - Data to update
       * @returns Promise to the current Index object with updated information
       */
      update(data) {
        return this.#httpRequestsWithTask.patch({
          path: `indexes/${this.uid}`,
          body: data
        });
      }
      /**
       * Delete an index.
       *
       * @returns Promise which resolves when index is deleted successfully
       */
      delete() {
        return this.#httpRequestsWithTask.delete({
          path: `indexes/${this.uid}`
        });
      }
      ///
      /// STATS
      ///
      /**
       * Get stats of an index
       *
       * @returns Promise containing object with stats of the index
       */
      async getStats() {
        return await this.httpRequest.get({
          path: `indexes/${this.uid}/stats`
        });
      }
      ///
      /// DOCUMENTS
      ///
      /**
       * Get documents of an index.
       *
       * @param params - Parameters to browse the documents. Parameters can contain
       *   the `filter` field only available in Meilisearch v1.2 and newer
       * @returns Promise containing the returned documents
       */
      async getDocuments(params) {
        const relativeBaseURL = `indexes/${this.uid}/documents`;
        return params?.filter !== void 0 ? (
          // In case `filter` is provided, use `POST /documents/fetch`
          await this.httpRequest.post({
            path: `${relativeBaseURL}/fetch`,
            body: params
          })
        ) : (
          // Else use `GET /documents` method
          await this.httpRequest.get({
            path: relativeBaseURL,
            params
          })
        );
      }
      /**
       * Get one document
       *
       * @param documentId - Document ID
       * @param parameters - Parameters applied on a document
       * @returns Promise containing Document response
       */
      async getDocument(documentId, parameters) {
        const fields = Array.isArray(parameters?.fields) ? parameters.fields.join() : void 0;
        return await this.httpRequest.get({
          path: `indexes/${this.uid}/documents/${documentId}`,
          params: { ...parameters, fields }
        });
      }
      /**
       * Add or replace multiples documents to an index
       *
       * @param documents - Array of Document objects to add/replace
       * @param options - Options on document addition
       * @returns Promise containing an EnqueuedTask
       */
      addDocuments(documents, options) {
        return this.#httpRequestsWithTask.post({
          path: `indexes/${this.uid}/documents`,
          params: options,
          body: documents
        });
      }
      /**
       * Add or replace multiples documents in a string format to an index. It only
       * supports csv, ndjson and json formats.
       *
       * @param documents - Documents provided in a string to add/replace
       * @param contentType - Content type of your document:
       *   'text/csv'|'application/x-ndjson'|'application/json'
       * @param options - Options on document addition
       * @returns Promise containing an EnqueuedTask
       */
      addDocumentsFromString(documents, contentType, queryParams) {
        return this.#httpRequestsWithTask.post({
          path: `indexes/${this.uid}/documents`,
          body: documents,
          params: queryParams,
          contentType
        });
      }
      /**
       * Add or replace multiples documents to an index in batches
       *
       * @param documents - Array of Document objects to add/replace
       * @param batchSize - Size of the batch
       * @param options - Options on document addition
       * @returns Promise containing array of enqueued task objects for each batch
       */
      addDocumentsInBatches(documents, batchSize = 1e3, options) {
        const updates = [];
        for (let i = 0; i < documents.length; i += batchSize) {
          updates.push(
            this.addDocuments(documents.slice(i, i + batchSize), options)
          );
        }
        return updates;
      }
      /**
       * Add or update multiples documents to an index
       *
       * @param documents - Array of Document objects to add/update
       * @param options - Options on document update
       * @returns Promise containing an EnqueuedTask
       */
      updateDocuments(documents, options) {
        return this.#httpRequestsWithTask.put({
          path: `indexes/${this.uid}/documents`,
          params: options,
          body: documents
        });
      }
      /**
       * Add or update multiples documents to an index in batches
       *
       * @param documents - Array of Document objects to add/update
       * @param batchSize - Size of the batch
       * @param options - Options on document update
       * @returns Promise containing array of enqueued task objects for each batch
       */
      updateDocumentsInBatches(documents, batchSize = 1e3, options) {
        const updates = [];
        for (let i = 0; i < documents.length; i += batchSize) {
          updates.push(
            this.updateDocuments(documents.slice(i, i + batchSize), options)
          );
        }
        return updates;
      }
      /**
       * Add or update multiples documents in a string format to an index. It only
       * supports csv, ndjson and json formats.
       *
       * @param documents - Documents provided in a string to add/update
       * @param contentType - Content type of your document:
       *   'text/csv'|'application/x-ndjson'|'application/json'
       * @param queryParams - Options on raw document addition
       * @returns Promise containing an EnqueuedTask
       */
      updateDocumentsFromString(documents, contentType, queryParams) {
        return this.#httpRequestsWithTask.put({
          path: `indexes/${this.uid}/documents`,
          body: documents,
          params: queryParams,
          contentType
        });
      }
      /**
       * Delete one document
       *
       * @param documentId - Id of Document to delete
       * @returns Promise containing an EnqueuedTask
       */
      deleteDocument(documentId) {
        return this.#httpRequestsWithTask.delete({
          path: `indexes/${this.uid}/documents/${documentId}`
        });
      }
      /**
       * Delete multiples documents of an index.
       *
       * @param params - Params value can be:
       *
       *   - DocumentsDeletionQuery: An object containing the parameters to customize
       *       your document deletion. Only available in Meilisearch v1.2 and newer
       *   - DocumentsIds: An array of document ids to delete
       *
       * @returns Promise containing an EnqueuedTask
       */
      deleteDocuments(params) {
        const isDocumentsDeletionQuery = !Array.isArray(params) && typeof params === "object";
        const endpoint = isDocumentsDeletionQuery ? "documents/delete" : "documents/delete-batch";
        return this.#httpRequestsWithTask.post({
          path: `indexes/${this.uid}/${endpoint}`,
          body: params
        });
      }
      /**
       * Delete all documents of an index
       *
       * @returns Promise containing an EnqueuedTask
       */
      deleteAllDocuments() {
        return this.#httpRequestsWithTask.delete({
          path: `indexes/${this.uid}/documents`
        });
      }
      /**
       * This is an EXPERIMENTAL feature, which may break without a major version.
       * It's available after Meilisearch v1.10.
       *
       * More info about the feature:
       * https://github.com/orgs/meilisearch/discussions/762 More info about
       * experimental features in general:
       * https://www.meilisearch.com/docs/reference/api/experimental-features
       *
       * @param options - Object containing the function string and related options
       * @returns Promise containing an EnqueuedTask
       */
      updateDocumentsByFunction(options) {
        return this.#httpRequestsWithTask.post({
          path: `indexes/${this.uid}/documents/edit`,
          body: options
        });
      }
      ///
      /// SETTINGS
      ///
      /**
       * Retrieve all settings
       *
       * @returns Promise containing Settings object
       */
      async getSettings() {
        return await this.httpRequest.get({
          path: `indexes/${this.uid}/settings`
        });
      }
      /**
       * Update all settings Any parameters not provided will be left unchanged.
       *
       * @param settings - Object containing parameters with their updated values
       * @returns Promise containing an EnqueuedTask
       */
      updateSettings(settings) {
        return this.#httpRequestsWithTask.patch({
          path: `indexes/${this.uid}/settings`,
          body: settings
        });
      }
      /**
       * Reset settings.
       *
       * @returns Promise containing an EnqueuedTask
       */
      resetSettings() {
        return this.#httpRequestsWithTask.delete({
          path: `indexes/${this.uid}/settings`
        });
      }
      ///
      /// PAGINATION SETTINGS
      ///
      /**
       * Get the pagination settings.
       *
       * @returns Promise containing object of pagination settings
       */
      async getPagination() {
        return await this.httpRequest.get({
          path: `indexes/${this.uid}/settings/pagination`
        });
      }
      /**
       * Update the pagination settings.
       *
       * @param pagination - Pagination object
       * @returns Promise containing an EnqueuedTask
       */
      updatePagination(pagination) {
        return this.#httpRequestsWithTask.patch({
          path: `indexes/${this.uid}/settings/pagination`,
          body: pagination
        });
      }
      /**
       * Reset the pagination settings.
       *
       * @returns Promise containing an EnqueuedTask
       */
      resetPagination() {
        return this.#httpRequestsWithTask.delete({
          path: `indexes/${this.uid}/settings/pagination`
        });
      }
      ///
      /// SYNONYMS
      ///
      /**
       * Get the list of all synonyms
       *
       * @returns Promise containing record of synonym mappings
       */
      async getSynonyms() {
        return await this.httpRequest.get({
          path: `indexes/${this.uid}/settings/synonyms`
        });
      }
      /**
       * Update the list of synonyms. Overwrite the old list.
       *
       * @param synonyms - Mapping of synonyms with their associated words
       * @returns Promise containing an EnqueuedTask
       */
      updateSynonyms(synonyms) {
        return this.#httpRequestsWithTask.put({
          path: `indexes/${this.uid}/settings/synonyms`,
          body: synonyms
        });
      }
      /**
       * Reset the synonym list to be empty again
       *
       * @returns Promise containing an EnqueuedTask
       */
      resetSynonyms() {
        return this.#httpRequestsWithTask.delete({
          path: `indexes/${this.uid}/settings/synonyms`
        });
      }
      ///
      /// STOP WORDS
      ///
      /**
       * Get the list of all stop-words
       *
       * @returns Promise containing array of stop-words
       */
      async getStopWords() {
        return await this.httpRequest.get({
          path: `indexes/${this.uid}/settings/stop-words`
        });
      }
      /**
       * Update the list of stop-words. Overwrite the old list.
       *
       * @param stopWords - Array of strings that contains the stop-words.
       * @returns Promise containing an EnqueuedTask
       */
      updateStopWords(stopWords) {
        return this.#httpRequestsWithTask.put({
          path: `indexes/${this.uid}/settings/stop-words`,
          body: stopWords
        });
      }
      /**
       * Reset the stop-words list to be empty again
       *
       * @returns Promise containing an EnqueuedTask
       */
      resetStopWords() {
        return this.#httpRequestsWithTask.delete({
          path: `indexes/${this.uid}/settings/stop-words`
        });
      }
      ///
      /// RANKING RULES
      ///
      /**
       * Get the list of all ranking-rules
       *
       * @returns Promise containing array of ranking-rules
       */
      async getRankingRules() {
        return await this.httpRequest.get({
          path: `indexes/${this.uid}/settings/ranking-rules`
        });
      }
      /**
       * Update the list of ranking-rules. Overwrite the old list.
       *
       * @param rankingRules - Array that contain ranking rules sorted by order of
       *   importance.
       * @returns Promise containing an EnqueuedTask
       */
      updateRankingRules(rankingRules) {
        return this.#httpRequestsWithTask.put({
          path: `indexes/${this.uid}/settings/ranking-rules`,
          body: rankingRules
        });
      }
      /**
       * Reset the ranking rules list to its default value
       *
       * @returns Promise containing an EnqueuedTask
       */
      resetRankingRules() {
        return this.#httpRequestsWithTask.delete({
          path: `indexes/${this.uid}/settings/ranking-rules`
        });
      }
      ///
      /// DISTINCT ATTRIBUTE
      ///
      /**
       * Get the distinct-attribute
       *
       * @returns Promise containing the distinct-attribute of the index
       */
      async getDistinctAttribute() {
        return await this.httpRequest.get({
          path: `indexes/${this.uid}/settings/distinct-attribute`
        });
      }
      /**
       * Update the distinct-attribute.
       *
       * @param distinctAttribute - Field name of the distinct-attribute
       * @returns Promise containing an EnqueuedTask
       */
      updateDistinctAttribute(distinctAttribute) {
        return this.#httpRequestsWithTask.put({
          path: `indexes/${this.uid}/settings/distinct-attribute`,
          body: distinctAttribute
        });
      }
      /**
       * Reset the distinct-attribute.
       *
       * @returns Promise containing an EnqueuedTask
       */
      resetDistinctAttribute() {
        return this.#httpRequestsWithTask.delete({
          path: `indexes/${this.uid}/settings/distinct-attribute`
        });
      }
      ///
      /// FILTERABLE ATTRIBUTES
      ///
      /**
       * Get the filterable-attributes
       *
       * @returns Promise containing an array of filterable-attributes
       */
      async getFilterableAttributes() {
        return await this.httpRequest.get({
          path: `indexes/${this.uid}/settings/filterable-attributes`
        });
      }
      /**
       * Update the filterable-attributes.
       *
       * @param filterableAttributes - Array of strings containing the attributes
       *   that can be used as filters at query time
       * @returns Promise containing an EnqueuedTask
       */
      updateFilterableAttributes(filterableAttributes) {
        return this.#httpRequestsWithTask.put({
          path: `indexes/${this.uid}/settings/filterable-attributes`,
          body: filterableAttributes
        });
      }
      /**
       * Reset the filterable-attributes.
       *
       * @returns Promise containing an EnqueuedTask
       */
      resetFilterableAttributes() {
        return this.#httpRequestsWithTask.delete({
          path: `indexes/${this.uid}/settings/filterable-attributes`
        });
      }
      ///
      /// SORTABLE ATTRIBUTES
      ///
      /**
       * Get the sortable-attributes
       *
       * @returns Promise containing array of sortable-attributes
       */
      async getSortableAttributes() {
        return await this.httpRequest.get({
          path: `indexes/${this.uid}/settings/sortable-attributes`
        });
      }
      /**
       * Update the sortable-attributes.
       *
       * @param sortableAttributes - Array of strings containing the attributes that
       *   can be used to sort search results at query time
       * @returns Promise containing an EnqueuedTask
       */
      updateSortableAttributes(sortableAttributes) {
        return this.#httpRequestsWithTask.put({
          path: `indexes/${this.uid}/settings/sortable-attributes`,
          body: sortableAttributes
        });
      }
      /**
       * Reset the sortable-attributes.
       *
       * @returns Promise containing an EnqueuedTask
       */
      resetSortableAttributes() {
        return this.#httpRequestsWithTask.delete({
          path: `indexes/${this.uid}/settings/sortable-attributes`
        });
      }
      ///
      /// SEARCHABLE ATTRIBUTE
      ///
      /**
       * Get the searchable-attributes
       *
       * @returns Promise containing array of searchable-attributes
       */
      async getSearchableAttributes() {
        return await this.httpRequest.get({
          path: `indexes/${this.uid}/settings/searchable-attributes`
        });
      }
      /**
       * Update the searchable-attributes.
       *
       * @param searchableAttributes - Array of strings that contains searchable
       *   attributes sorted by order of importance(most to least important)
       * @returns Promise containing an EnqueuedTask
       */
      updateSearchableAttributes(searchableAttributes) {
        return this.#httpRequestsWithTask.put({
          path: `indexes/${this.uid}/settings/searchable-attributes`,
          body: searchableAttributes
        });
      }
      /**
       * Reset the searchable-attributes.
       *
       * @returns Promise containing an EnqueuedTask
       */
      resetSearchableAttributes() {
        return this.#httpRequestsWithTask.delete({
          path: `indexes/${this.uid}/settings/searchable-attributes`
        });
      }
      ///
      /// DISPLAYED ATTRIBUTE
      ///
      /**
       * Get the displayed-attributes
       *
       * @returns Promise containing array of displayed-attributes
       */
      async getDisplayedAttributes() {
        return await this.httpRequest.get({
          path: `indexes/${this.uid}/settings/displayed-attributes`
        });
      }
      /**
       * Update the displayed-attributes.
       *
       * @param displayedAttributes - Array of strings that contains attributes of
       *   an index to display
       * @returns Promise containing an EnqueuedTask
       */
      updateDisplayedAttributes(displayedAttributes) {
        return this.#httpRequestsWithTask.put({
          path: `indexes/${this.uid}/settings/displayed-attributes`,
          body: displayedAttributes
        });
      }
      /**
       * Reset the displayed-attributes.
       *
       * @returns Promise containing an EnqueuedTask
       */
      resetDisplayedAttributes() {
        return this.#httpRequestsWithTask.delete({
          path: `indexes/${this.uid}/settings/displayed-attributes`
        });
      }
      ///
      /// TYPO TOLERANCE
      ///
      /**
       * Get the typo tolerance settings.
       *
       * @returns Promise containing the typo tolerance settings.
       */
      async getTypoTolerance() {
        return await this.httpRequest.get({
          path: `indexes/${this.uid}/settings/typo-tolerance`
        });
      }
      /**
       * Update the typo tolerance settings.
       *
       * @param typoTolerance - Object containing the custom typo tolerance
       *   settings.
       * @returns Promise containing object of the enqueued update
       */
      updateTypoTolerance(typoTolerance) {
        return this.#httpRequestsWithTask.patch({
          path: `indexes/${this.uid}/settings/typo-tolerance`,
          body: typoTolerance
        });
      }
      /**
       * Reset the typo tolerance settings.
       *
       * @returns Promise containing object of the enqueued update
       */
      resetTypoTolerance() {
        return this.#httpRequestsWithTask.delete({
          path: `indexes/${this.uid}/settings/typo-tolerance`
        });
      }
      ///
      /// FACETING
      ///
      /**
       * Get the faceting settings.
       *
       * @returns Promise containing object of faceting index settings
       */
      async getFaceting() {
        return await this.httpRequest.get({
          path: `indexes/${this.uid}/settings/faceting`
        });
      }
      /**
       * Update the faceting settings.
       *
       * @param faceting - Faceting index settings object
       * @returns Promise containing an EnqueuedTask
       */
      updateFaceting(faceting) {
        return this.#httpRequestsWithTask.patch({
          path: `indexes/${this.uid}/settings/faceting`,
          body: faceting
        });
      }
      /**
       * Reset the faceting settings.
       *
       * @returns Promise containing an EnqueuedTask
       */
      resetFaceting() {
        return this.#httpRequestsWithTask.delete({
          path: `indexes/${this.uid}/settings/faceting`
        });
      }
      ///
      /// SEPARATOR TOKENS
      ///
      /**
       * Get the list of all separator tokens.
       *
       * @returns Promise containing array of separator tokens
       */
      async getSeparatorTokens() {
        return await this.httpRequest.get({
          path: `indexes/${this.uid}/settings/separator-tokens`
        });
      }
      /**
       * Update the list of separator tokens. Overwrite the old list.
       *
       * @param separatorTokens - Array that contains separator tokens.
       * @returns Promise containing an EnqueuedTask or null
       */
      updateSeparatorTokens(separatorTokens) {
        return this.#httpRequestsWithTask.put({
          path: `indexes/${this.uid}/settings/separator-tokens`,
          body: separatorTokens
        });
      }
      /**
       * Reset the separator tokens list to its default value
       *
       * @returns Promise containing an EnqueuedTask
       */
      resetSeparatorTokens() {
        return this.#httpRequestsWithTask.delete({
          path: `indexes/${this.uid}/settings/separator-tokens`
        });
      }
      ///
      /// NON-SEPARATOR TOKENS
      ///
      /**
       * Get the list of all non-separator tokens.
       *
       * @returns Promise containing array of non-separator tokens
       */
      async getNonSeparatorTokens() {
        return await this.httpRequest.get({
          path: `indexes/${this.uid}/settings/non-separator-tokens`
        });
      }
      /**
       * Update the list of non-separator tokens. Overwrite the old list.
       *
       * @param nonSeparatorTokens - Array that contains non-separator tokens.
       * @returns Promise containing an EnqueuedTask or null
       */
      updateNonSeparatorTokens(nonSeparatorTokens) {
        return this.#httpRequestsWithTask.put({
          path: `indexes/${this.uid}/settings/non-separator-tokens`,
          body: nonSeparatorTokens
        });
      }
      /**
       * Reset the non-separator tokens list to its default value
       *
       * @returns Promise containing an EnqueuedTask
       */
      resetNonSeparatorTokens() {
        return this.#httpRequestsWithTask.delete({
          path: `indexes/${this.uid}/settings/non-separator-tokens`
        });
      }
      ///
      /// DICTIONARY
      ///
      /**
       * Get the dictionary settings of a Meilisearch index.
       *
       * @returns Promise containing the dictionary settings
       */
      async getDictionary() {
        return await this.httpRequest.get({
          path: `indexes/${this.uid}/settings/dictionary`
        });
      }
      /**
       * Update the dictionary settings. Overwrite the old settings.
       *
       * @param dictionary - Array that contains the new dictionary settings.
       * @returns Promise containing an EnqueuedTask or null
       */
      updateDictionary(dictionary) {
        return this.#httpRequestsWithTask.put({
          path: `indexes/${this.uid}/settings/dictionary`,
          body: dictionary
        });
      }
      /**
       * Reset the dictionary settings to its default value
       *
       * @returns Promise containing an EnqueuedTask
       */
      resetDictionary() {
        return this.#httpRequestsWithTask.delete({
          path: `indexes/${this.uid}/settings/dictionary`
        });
      }
      ///
      /// PROXIMITY PRECISION
      ///
      /**
       * Get the proximity precision settings of a Meilisearch index.
       *
       * @returns Promise containing the proximity precision settings
       */
      async getProximityPrecision() {
        return await this.httpRequest.get({
          path: `indexes/${this.uid}/settings/proximity-precision`
        });
      }
      /**
       * Update the proximity precision settings. Overwrite the old settings.
       *
       * @param proximityPrecision - String that contains the new proximity
       *   precision settings.
       * @returns Promise containing an EnqueuedTask or null
       */
      updateProximityPrecision(proximityPrecision) {
        return this.#httpRequestsWithTask.put({
          path: `indexes/${this.uid}/settings/proximity-precision`,
          body: proximityPrecision
        });
      }
      /**
       * Reset the proximity precision settings to its default value
       *
       * @returns Promise containing an EnqueuedTask
       */
      resetProximityPrecision() {
        return this.#httpRequestsWithTask.delete({
          path: `indexes/${this.uid}/settings/proximity-precision`
        });
      }
      ///
      /// EMBEDDERS
      ///
      /**
       * Get the embedders settings of a Meilisearch index.
       *
       * @returns Promise containing the embedders settings
       */
      async getEmbedders() {
        return await this.httpRequest.get({
          path: `indexes/${this.uid}/settings/embedders`
        });
      }
      /**
       * Update the embedders settings. Overwrite the old settings.
       *
       * @param embedders - Object that contains the new embedders settings.
       * @returns Promise containing an EnqueuedTask or null
       */
      updateEmbedders(embedders) {
        return this.#httpRequestsWithTask.patch({
          path: `indexes/${this.uid}/settings/embedders`,
          body: embedders
        });
      }
      /**
       * Reset the embedders settings to its default value
       *
       * @returns Promise containing an EnqueuedTask
       */
      resetEmbedders() {
        return this.#httpRequestsWithTask.delete({
          path: `indexes/${this.uid}/settings/embedders`
        });
      }
      ///
      /// SEARCHCUTOFFMS SETTINGS
      ///
      /**
       * Get the SearchCutoffMs settings.
       *
       * @returns Promise containing object of SearchCutoffMs settings
       */
      async getSearchCutoffMs() {
        return await this.httpRequest.get({
          path: `indexes/${this.uid}/settings/search-cutoff-ms`
        });
      }
      /**
       * Update the SearchCutoffMs settings.
       *
       * @param searchCutoffMs - Object containing SearchCutoffMsSettings
       * @returns Promise containing an EnqueuedTask
       */
      updateSearchCutoffMs(searchCutoffMs) {
        return this.#httpRequestsWithTask.put({
          path: `indexes/${this.uid}/settings/search-cutoff-ms`,
          body: searchCutoffMs
        });
      }
      /**
       * Reset the SearchCutoffMs settings.
       *
       * @returns Promise containing an EnqueuedTask
       */
      resetSearchCutoffMs() {
        return this.#httpRequestsWithTask.delete({
          path: `indexes/${this.uid}/settings/search-cutoff-ms`
        });
      }
      ///
      /// LOCALIZED ATTRIBUTES SETTINGS
      ///
      /**
       * Get the localized attributes settings.
       *
       * @returns Promise containing object of localized attributes settings
       */
      async getLocalizedAttributes() {
        return await this.httpRequest.get({
          path: `indexes/${this.uid}/settings/localized-attributes`
        });
      }
      /**
       * Update the localized attributes settings.
       *
       * @param localizedAttributes - Localized attributes object
       * @returns Promise containing an EnqueuedTask
       */
      updateLocalizedAttributes(localizedAttributes) {
        return this.#httpRequestsWithTask.put({
          path: `indexes/${this.uid}/settings/localized-attributes`,
          body: localizedAttributes
        });
      }
      /**
       * Reset the localized attributes settings.
       *
       * @returns Promise containing an EnqueuedTask
       */
      resetLocalizedAttributes() {
        return this.#httpRequestsWithTask.delete({
          path: `indexes/${this.uid}/settings/localized-attributes`
        });
      }
      ///
      /// FACET SEARCH SETTINGS
      ///
      /**
       * Get the facet search settings.
       *
       * @returns Promise containing object of facet search settings
       */
      async getFacetSearch() {
        return await this.httpRequest.get({
          path: `indexes/${this.uid}/settings/facet-search`
        });
      }
      /**
       * Update the facet search settings.
       *
       * @param facetSearch - Boolean value
       * @returns Promise containing an EnqueuedTask
       */
      updateFacetSearch(facetSearch) {
        return this.#httpRequestsWithTask.put({
          path: `indexes/${this.uid}/settings/facet-search`,
          body: facetSearch
        });
      }
      /**
       * Reset the facet search settings.
       *
       * @returns Promise containing an EnqueuedTask
       */
      resetFacetSearch() {
        return this.#httpRequestsWithTask.delete({
          path: `indexes/${this.uid}/settings/facet-search`
        });
      }
      ///
      /// PREFIX SEARCH SETTINGS
      ///
      /**
       * Get the prefix search settings.
       *
       * @returns Promise containing object of prefix search settings
       */
      async getPrefixSearch() {
        return await this.httpRequest.get({
          path: `indexes/${this.uid}/settings/prefix-search`
        });
      }
      /**
       * Update the prefix search settings.
       *
       * @param prefixSearch - PrefixSearch value
       * @returns Promise containing an EnqueuedTask
       */
      updatePrefixSearch(prefixSearch) {
        return this.#httpRequestsWithTask.put({
          path: `indexes/${this.uid}/settings/prefix-search`,
          body: prefixSearch
        });
      }
      /**
       * Reset the prefix search settings.
       *
       * @returns Promise containing an EnqueuedTask
       */
      resetPrefixSearch() {
        return this.#httpRequestsWithTask.delete({
          path: `indexes/${this.uid}/settings/prefix-search`
        });
      }
      ///
      /// CHAT SETTINGS
      ///
      /**
       * Get the index's chat settings.
       *
       * @returns Promise containing a ChatSettings object
       */
      async getChat() {
        return await this.httpRequest.get({
          path: `indexes/${this.uid}/settings/chat`
        });
      }
      /**
       * Update the index's chat settings.
       *
       * @param chatSettings - ChatSettingsPayload object
       * @returns Promise containing an EnqueuedTask
       */
      updateChat(chatSettings) {
        return this.#httpRequestsWithTask.patch({
          path: `indexes/${this.uid}/settings/chat`,
          body: chatSettings
        });
      }
    };
    var BatchClient = class {
      #httpRequest;
      constructor(httpRequests) {
        this.#httpRequest = httpRequests;
      }
      /** {@link https://www.meilisearch.com/docs/reference/api/batches#get-one-batch} */
      async getBatch(uid) {
        return await this.#httpRequest.get({ path: `batches/${uid}` });
      }
      /** {@link https://www.meilisearch.com/docs/reference/api/batches#get-batches} */
      async getBatches(params) {
        return await this.#httpRequest.get({ path: "batches", params });
      }
    };
    var ChatWorkspace = class {
      #httpRequest;
      #workspace;
      constructor(httpRequests, workspace) {
        this.#httpRequest = httpRequests;
        this.#workspace = workspace;
      }
      /**
       * Get the settings of a chat workspace.
       *
       * @experimental
       * @see {@link https://www.meilisearch.com/docs/reference/api/chats#get-chat-workspace-settings}
       */
      async get() {
        return await this.#httpRequest.get({
          path: `chats/${this.#workspace}/settings`
        });
      }
      /**
       * Update the settings of a chat workspace.
       *
       * @experimental
       * @see {@link https://www.meilisearch.com/docs/reference/api/chats#update-chat-workspace-settings}
       */
      async update(settings) {
        return await this.#httpRequest.patch({
          path: `chats/${this.#workspace}/settings`,
          body: settings
        });
      }
      /**
       * Reset the settings of a chat workspace.
       *
       * @experimental
       * @see {@link https://www.meilisearch.com/docs/reference/api/chats#reset-chat-workspace-settings}
       */
      async reset() {
        await this.#httpRequest.delete({
          path: `chats/${this.#workspace}/settings`
        });
      }
      /**
       * Create a chat completion using an OpenAI-compatible interface.
       *
       * @experimental
       * @see {@link https://www.meilisearch.com/docs/reference/api/chats#chat-completions}
       */
      async streamCompletion(completion) {
        if (!completion.stream) {
          throw new Error("The SDK only supports streaming");
        }
        return await this.#httpRequest.postStream({
          path: `chats/${this.#workspace}/chat/completions`,
          body: completion
        });
      }
    };
    var MeiliSearch2 = class {
      config;
      httpRequest;
      #taskClient;
      get tasks() {
        return this.#taskClient;
      }
      #batchClient;
      get batches() {
        return this.#batchClient;
      }
      #httpRequestsWithTask;
      /**
       * Creates new MeiliSearch instance
       *
       * @param config - Configuration object
       */
      constructor(config) {
        this.config = config;
        this.httpRequest = new HttpRequests(config);
        this.#taskClient = new TaskClient(
          this.httpRequest,
          config.defaultWaitOptions
        );
        this.#batchClient = new BatchClient(this.httpRequest);
        this.#httpRequestsWithTask = getHttpRequestsWithEnqueuedTaskPromise(
          this.httpRequest,
          this.tasks
        );
      }
      /**
       * Return an Index instance
       *
       * @param indexUid - The index UID
       * @returns Instance of Index
       */
      index(indexUid) {
        return new Index(this.config, indexUid);
      }
      /**
       * Gather information about an index by calling MeiliSearch and return an
       * Index instance with the gathered information
       *
       * @param indexUid - The index UID
       * @returns Promise returning Index instance
       */
      async getIndex(indexUid) {
        return new Index(this.config, indexUid).fetchInfo();
      }
      /**
       * Gather information about an index by calling MeiliSearch and return the raw
       * JSON response
       *
       * @param indexUid - The index UID
       * @returns Promise returning index information
       */
      async getRawIndex(indexUid) {
        return new Index(this.config, indexUid).getRawInfo();
      }
      /**
       * Get all the indexes as Index instances.
       *
       * @param parameters - Parameters to browse the indexes
       * @returns Promise returning array of raw index information
       */
      async getIndexes(parameters) {
        const rawIndexes = await this.getRawIndexes(parameters);
        const indexes = rawIndexes.results.map(
          (index) => new Index(this.config, index.uid, index.primaryKey)
        );
        return { ...rawIndexes, results: indexes };
      }
      /**
       * Get all the indexes in their raw value (no Index instances).
       *
       * @param parameters - Parameters to browse the indexes
       * @returns Promise returning array of raw index information
       */
      async getRawIndexes(parameters) {
        return await this.httpRequest.get({
          path: "indexes",
          params: parameters
        });
      }
      /**
       * Create a new index
       *
       * @param uid - The index UID
       * @param options - Index options
       * @returns Promise returning Index instance
       */
      createIndex(uid, options) {
        return Index.create(uid, options, this.config);
      }
      /**
       * Update an index
       *
       * @param uid - The index UID
       * @param options - Index options to update
       * @returns Promise returning Index instance after updating
       */
      updateIndex(uid, options) {
        return new Index(this.config, uid).update(options);
      }
      /**
       * Delete an index
       *
       * @param uid - The index UID
       * @returns Promise which resolves when index is deleted successfully
       */
      deleteIndex(uid) {
        return new Index(this.config, uid).delete();
      }
      /**
       * Deletes an index if it already exists.
       *
       * @param uid - The index UID
       * @returns Promise which resolves to true when index exists and is deleted
       *   successfully, otherwise false if it does not exist
       */
      async deleteIndexIfExists(uid) {
        try {
          await this.deleteIndex(uid);
          return true;
        } catch (e) {
          if (e?.cause?.code === ErrorStatusCode.INDEX_NOT_FOUND) {
            return false;
          }
          throw e;
        }
      }
      /**
       * Swaps a list of index tuples.
       *
       * @param params - List of indexes tuples to swap.
       * @returns Promise returning object of the enqueued task
       */
      swapIndexes(params) {
        return this.#httpRequestsWithTask.post({
          path: "/swap-indexes",
          body: params
        });
      }
      ///
      /// Multi Search
      ///
      /**
       * Perform multiple search queries.
       *
       * It is possible to make multiple search queries on the same index or on
       * different ones. With network feature enabled, you can also search across
       * remote instances.
       *
       * @example
       *
       * ```ts
       * client.multiSearch({
       *   queries: [
       *     { indexUid: "movies", q: "wonder" },
       *     { indexUid: "books", q: "flower" },
       *   ],
       * });
       *
       * // Federated search with remote instance (requires network feature enabled)
       * client.multiSearch({
       *   federation: {},
       *   queries: [
       *     {
       *       indexUid: "movies",
       *       q: "wonder",
       *       federationOptions: {
       *         remote: "meilisearch instance name",
       *       },
       *     },
       *     {
       *       indexUid: "movies",
       *       q: "wonder",
       *       federationOptions: {
       *         remote: "meilisearch instance name",
       *       },
       *     },
       *   ],
       * });
       * ```
       *
       * @param queries - Search queries
       * @param extraRequestInit - Additional request configuration options
       * @returns Promise containing the search responses
       * @see {@link https://www.meilisearch.com/docs/learn/multi_search/implement_sharding#perform-a-search}
       */
      async multiSearch(queries, extraRequestInit) {
        return await this.httpRequest.post({
          path: "multi-search",
          body: queries,
          extraRequestInit
        });
      }
      ///
      /// CHATS
      ///
      /**
       * Get a chat workspace instance
       *
       * @param workspace - The chat workspace UID
       * @returns Instance of ChatWorkspace
       */
      chat(workspace) {
        return new ChatWorkspace(this.httpRequest, workspace);
      }
      /**
       * Get all chat workspaces
       *
       * @returns Promise returning an array of chat workspaces UIDs
       */
      async getChatWorkspaces() {
        return await this.httpRequest.get({
          path: "chats"
        });
      }
      ///
      /// WEBHOOKS
      ///
      /**
       * Get all webhooks
       *
       * @returns Promise returning an object with webhooks
       */
      async getWebhooks() {
        return await this.httpRequest.get({ path: "webhooks" });
      }
      /**
       * Get a webhook
       *
       * @param uuid - Webhook UUID
       * @returns Promise returning the webhook
       */
      async getWebhook(uuid) {
        return await this.httpRequest.get({ path: `webhooks/${uuid}` });
      }
      /**
       * Create a webhook
       *
       * @param webhook - Webhook to create
       * @returns Promise returning the created webhook
       */
      async createWebhook(webhook) {
        return await this.httpRequest.post({ path: "webhooks", body: webhook });
      }
      /**
       * Update a webhook
       *
       * @param uuid - Webhook UUID
       * @param webhook - Webhook to update
       * @returns Promise returning the updated webhook
       */
      async updateWebhook(uuid, webhook) {
        return await this.httpRequest.patch({
          path: `webhooks/${uuid}`,
          body: webhook
        });
      }
      /**
       * Delete a webhook
       *
       * @param uuid - Webhook UUID
       * @returns Promise returning void
       */
      async deleteWebhook(uuid) {
        await this.httpRequest.delete({ path: `webhooks/${uuid}` });
      }
      ///
      ///  Network
      ///
      /**
       * {@link https://www.meilisearch.com/docs/reference/api/network#get-the-network-object}
       *
       * @experimental
       */
      async getNetwork() {
        return await this.httpRequest.get({ path: "network" });
      }
      /**
       * {@link https://www.meilisearch.com/docs/reference/api/network#update-the-network-object}
       *
       * @experimental
       */
      async updateNetwork(network) {
        return await this.httpRequest.patch({
          path: "network",
          body: network
        });
      }
      ///
      /// KEYS
      ///
      /**
       * Get all API keys
       *
       * @param parameters - Parameters to browse the indexes
       * @returns Promise returning an object with keys
       */
      async getKeys(parameters) {
        const keys = await this.httpRequest.get({
          path: "keys",
          params: parameters
        });
        keys.results = keys.results.map((key) => ({
          ...key,
          createdAt: new Date(key.createdAt),
          updatedAt: new Date(key.updatedAt)
        }));
        return keys;
      }
      /**
       * Get one API key
       *
       * @param keyOrUid - Key or uid of the API key
       * @returns Promise returning a key
       */
      async getKey(keyOrUid) {
        return await this.httpRequest.get({
          path: `keys/${keyOrUid}`
        });
      }
      /**
       * Create one API key
       *
       * @param options - Key options
       * @returns Promise returning a key
       */
      async createKey(options) {
        return await this.httpRequest.post({
          path: "keys",
          body: options
        });
      }
      /**
       * Update one API key
       *
       * @param keyOrUid - Key
       * @param options - Key options
       * @returns Promise returning a key
       */
      async updateKey(keyOrUid, options) {
        return await this.httpRequest.patch({
          path: `keys/${keyOrUid}`,
          body: options
        });
      }
      /**
       * Delete one API key
       *
       * @param keyOrUid - Key
       * @returns
       */
      async deleteKey(keyOrUid) {
        await this.httpRequest.delete({ path: `keys/${keyOrUid}` });
      }
      ///
      /// HEALTH
      ///
      /**
       * Checks if the server is healthy, otherwise an error will be thrown.
       *
       * @returns Promise returning an object with health details
       */
      async health() {
        return await this.httpRequest.get({ path: "health" });
      }
      /**
       * Checks if the server is healthy, return true or false.
       *
       * @returns Promise returning a boolean
       */
      async isHealthy() {
        try {
          const { status } = await this.health();
          return status === "available";
        } catch {
          return false;
        }
      }
      ///
      /// STATS
      ///
      /**
       * Get the stats of all the database
       *
       * @returns Promise returning object of all the stats
       */
      async getStats() {
        return await this.httpRequest.get({ path: "stats" });
      }
      ///
      /// VERSION
      ///
      /**
       * Get the version of MeiliSearch
       *
       * @returns Promise returning object with version details
       */
      async getVersion() {
        return await this.httpRequest.get({ path: "version" });
      }
      ///
      /// DUMPS
      ///
      /**
       * Creates a dump
       *
       * @returns Promise returning object of the enqueued task
       */
      createDump() {
        return this.#httpRequestsWithTask.post({
          path: "dumps"
        });
      }
      ///
      /// SNAPSHOTS
      ///
      /**
       * Creates a snapshot
       *
       * @returns Promise returning object of the enqueued task
       */
      createSnapshot() {
        return this.#httpRequestsWithTask.post({
          path: "snapshots"
        });
      }
      ///
      /// EXPERIMENTAL-FEATURES
      ///
      /** {@link https://www.meilisearch.com/docs/reference/api/experimental_features#get-all-experimental-features} */
      async getExperimentalFeatures() {
        return await this.httpRequest.get({
          path: "experimental-features"
        });
      }
      /** {@link https://www.meilisearch.com/docs/reference/api/experimental_features#configure-experimental-features} */
      async updateExperimentalFeatures(runtimeTogglableFeatures) {
        return await this.httpRequest.patch({
          path: "experimental-features",
          body: runtimeTogglableFeatures
        });
      }
    };
    var defaultExport = MeiliSearch2;
    exports2.ContentTypeEnum = ContentTypeEnum;
    exports2.ErrorStatusCode = ErrorStatusCode;
    exports2.Index = Index;
    exports2.MatchingStrategies = MatchingStrategies;
    exports2.MeiliSearch = MeiliSearch2;
    exports2.MeiliSearchApiError = MeiliSearchApiError;
    exports2.MeiliSearchError = MeiliSearchError;
    exports2.MeiliSearchRequestError = MeiliSearchRequestError;
    exports2.MeiliSearchRequestTimeOutError = MeiliSearchRequestTimeOutError;
    exports2.MeiliSearchTaskTimeOutError = MeiliSearchTaskTimeOutError;
    exports2.Meilisearch = MeiliSearch2;
    exports2.default = defaultExport;
  }
});

// netlify/functions/meilisearch.js
var { MeiliSearch } = require_cjs();
exports.handler = async (event, context) => {
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Content-Type": "application/json"
  };
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 200,
      headers,
      body: ""
    };
  }
  try {
    const client = new MeiliSearch({
      host: process.env.MEILISEARCH_HOST_URL || "https://ms-3ade175771ef-34593.sfo.meilisearch.io",
      apiKey: process.env.MEILISEARCH_API_KEY
      // API key must be set in environment variables
    });
    console.log("api key: " + client.apiKey);
    const { httpMethod, body, queryStringParameters } = event;
    if (httpMethod === "GET") {
      const path = event.path.replace("/.netlify/functions/meilisearch", "");
      if (path === "/health") {
        const health = await client.health();
        return {
          statusCode: 200,
          headers,
          body: JSON.stringify(health)
        };
      }
      if (path === "/stats") {
        const stats = await client.getStats();
        return {
          statusCode: 200,
          headers,
          body: JSON.stringify(stats)
        };
      }
    }
    if (httpMethod === "POST") {
      const searchData = JSON.parse(body || "{}");
      const { index, q, ...searchParams } = searchData;
      if (!index || !q) {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({
            error: "Missing required parameters: index and q"
          })
        };
      }
      const searchResults = await client.index(index).search(q, searchParams);
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify(searchResults)
      };
    }
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: "Method not allowed" })
    };
  } catch (error) {
    console.error("Meilisearch function error:", error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: "Internal server error",
        message: error.message,
        details: process.env.NODE_ENV === "development" ? error.stack : void 0
      })
    };
  }
};
//# sourceMappingURL=meilisearch.js.map
