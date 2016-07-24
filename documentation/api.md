# API

This API aims to be compliant to the [Microsoft HTTP API Guidelines](https://github.com/Microsoft/api-guidelines/).

:warning: Some of these endpoints are not implemented yet, as this is only a draft.

## Encryption

This API aims to provide the maximum amount of end-to-end AES encryption possible. File and folder names, as well as metadata, may be encrypted.

## Headers

| Name          | Explanation                                                   |
|:--------------|:--------------------------------------------------------------|
| X-Created     | UTC Timestamp, may be encrypted                               |
| X-Encryption  | none or AES, specifies if and which encryption was used       |
| X-Modified    | UTC Timestamp, may be encrypted                               |
| X-Name        | Filename, may be encrypted                                    |
| X-Path        | Full user-space filesystem-path of resource, may be encrypted |
| X-Permissions | Permissions, may be encrypted                                 |
| X-Tags        | Array containing all tag indices (tags are enumerated)        |

## Tags

To support encryption, while still being able to search by tag, tags are enumerated.

Example:

| Index | Tag  |
|:------|:-----|
| 0     | Work |
| 1     | Home |

## Methods

### Folder

#### POST `/api/v1.0/folder/`

Recursive is similar to `mkdir -p`.

##### Request

````javascript
{
	"path": "/path/of/folder",
	"recursive": true // default
}
````

##### Response

| Status | Meaning      | Body             | Headers                                         |
|:-------|:-------------|:-----------------|:------------------------------------------------|
| 201    | Created      | `{"id": ":id"}`  | Location: `https://:server/api/v1.0/folder/:id` |
| 401    | Unauthorized | `{"error": ...}` | none                                            |

#### GET/HEAD `/api/v1.0/folder/:id`

HEAD will not return the folder body, only the metadata as headers.

##### Response

| Status | Meaning      | Body                                                       | Headers                                                                    |
|:-------|:-------------|:-----------------------------------------------------------|:---------------------------------------------------------------------------|
| 200    | Success      | `{children: {r4nd0m1d: {"name": "sub", "type": "folder"}}` | X-Created, X-Encryption, X-Modified, X-Name, X-Path, X-Permissions, X-Tags |
| 401    | Unauthorized | `{"error": ...}`                                           | none                                                                       |
| 404    | Not Found    | `{"error": ...}`                                           | none                                                                       |

#### DELETE `/api/v1.0/folder/:id`

##### Response

| Status | Meaning      | Body                | Headers |
|:-------|:-------------|:--------------------|:--------|
| 200    | Deleted      | `{"success": true}` | none    |
| 401    | Unauthorized | `{"error": ...}`    | none    |
| 404    | Not Found    | `{"error": ...}`    | none    |

### File

#### POST `/api/v1.0/file/`

##### Request

````javascript
{
	"path": "/path/of/file",
	"recursive": true // default
}
````

##### Response

| Status | Meaning      | Body             | Headers                                       |
|:-------|:-------------|:-----------------|:----------------------------------------------|
| 201    | Created      | `{"id": ":id"}`  | Location: `https://:server/api/v1.0/file/:id` |
| 401    | Unauthorized | `{"error": ...}` | none                                          |

#### GET/HEAD `/api/v1.0/file/:id`

HEAD will not return the file body, only the metadata as headers.

##### Response

| Status | Meaning      | Body             | Headers                                                                    |
|:-------|:-------------|:-----------------|:---------------------------------------------------------------------------|
| 200    | Success      | `:content`       | X-Created, X-Encryption, X-Modified, X-Name, X-Path, X-Permissions, X-Tags |
| 401    | Unauthorized | `{"error": ...}` | none                                                                       |
| 404    | Not Found    | `{"error": ...}` | none                                                                       |

#### DELETE `/api/v1.0/file/:id`

##### Response

| Status | Meaning      | Body                | Headers |
|:-------|:-------------|:--------------------|:--------|
| 200    | Deleted      | `{"success": true}` | none    |
| 401    | Unauthorized | `{"error": ...}`    | none    |
| 404    | Not Found    | `{"error": ...}`    | none    |

### Tag

#### GET `/api/v1.0/tags/`

##### Response

| Status | Meaning      | Body                                                                                   | Headers      |
|:-------|:-------------|:---------------------------------------------------------------------------------------|:-------------|
| 200    | Success      | `{"0": {"name": "work", "color": "FF0000"}, "1": {"name": "home", "color": "00FF00"}}` | X-Encryption |
| 401    | Unauthorized | `{"error": ...}`                                                                       | none         |
