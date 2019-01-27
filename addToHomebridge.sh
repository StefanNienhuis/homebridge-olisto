#!/bin/bash
CONFIG_LOCATION="/var/homebridge/config.json"
OLISTO_URL=https://connect.triggi.com/c/B0wuxnS6T8bvw78oZZ7M
if [ -z "$1" ]
  then
    echo "No argument supplied"
	exit 1
fi

jq --arg argo "$1" '.platforms[] | select(.platform=="Olisto").triggs += [{"name":$argo,"type":"switch","connecturl":"'$OLISTO_URL'"}]' $CONFIG_LOCATION

