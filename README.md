```bash
CREATE TABLE log_events
(
    event_id UUID,
    timestamp DateTime,
    deployment_id String,
    log String,
    metadata String
)
ENGINE = MergeTree
PARTITION BY toYYYYMM(timestamp)
ORDER BY (deployment_id, timestamp)
SETTINGS index_granularity = 8192;
```

```bash
CREATE TABLE project_analytics
(
    event_id UUID,
    timestamp DateTime,
    project_id String,
    sub_domain String,
    ip IPv4,
    country LowCardinality(String),
    latitude Float64,
    longitude Float64,
    referrer String,
    device_type LowCardinality(String),
    browser LowCardinality(String),
    os LowCardinality(String),
    accept_language String,
    user_agent String,
    authorization String
)
ENGINE = MergeTree
PARTITION BY toYYYYMM(timestamp)
ORDER BY (project_id, timestamp);
```