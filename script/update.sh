#!/bin/bash

VNSTAT='/usr/local/Cellar/vnstat/1.10/bin/vnstat'
VNSTAT_DB='/usr/local/var/db/vnstat'
VNSTAT_INTERFACE='en0'
VNSTAT_ROOT=~/Sites/vnstat

$VNSTAT --dbdir "$VNSTAT_DB" -u
$VNSTAT --dbdir "$VNSTAT_DB" --xml > "$VNSTAT_ROOT/vnstat.xml"
