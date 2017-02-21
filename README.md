# Signer-Aws-Lambda
The AWS Lambda instance for signing transaction for a specific contract with a given wallet.

## Dependencies

- [Serverless](https://serverless.com/) as a development and deployment framework for AWS Lambda

## Install

```console
npm install -g serverless
npm install
```

## AWS Credentials

[Please follow this guide to setup the AWS Credential](
https://serverless.com/framework/docs/providers/aws/guide/credentials/)

You can then update `profile: nicolas` in `serverless.yml` to match yours.

## Setup config.json

Copy `config.model.json` to `config.json` and update it to match your config.


## Test

```console
serverless invoke local --function sign --path test-data.json
```

## Deploy

- All

```console
serverless deploy
```

- Update the function sign when already deployed

```console
serverless deploy function -f sign
```