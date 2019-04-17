# Project Name

> Chart Module Component

## Related Projects

  - https://github.com/hrsf113-group-5/chart_module
  - https://github.com/hrsf113-group-5/about_info_module
  - https://github.com/hrsf113-group-5/buy_sell_module
  - https://github.com/hrsf113-group-5/ratings_history_module

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)

## Usage

> View price points of specific stocks using /stocks/:stockid

## Requirements

An `nvmrc` file is included if using [nvm](https://github.com/creationix/nvm).

- Node 6.13.0
- etc

## Development

### Installing Dependencies

From within the root directory:

```sh
npm install -g webpack
npm install
```

## Available API Routes

For more, check out the json-server documentation!

| Endpoint                       | Type   | Operation                                                    |
|--------------------------------|--------|--------------------------------------------------------------|
| `/api/stocks/:stockid/prices`  | GET    | Get all price points from the last 5 years for symbol        |
| `/api/stocks/`                 | POST   | Add Symbol                                                   |
| `/api/stocks/:stockid/prices`  | PUT    | Update price points for symbol                               | 
| `/api/stocks/:stockid/prices`  | DELETE | Delete price points for symbol                               |

