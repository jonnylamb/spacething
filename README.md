I made this thing to check whether there were tickets for the VIP tour
of the Johnson Space Center available for a particluar day.

*Note*: sandbox is broken for some reason.

Run ad-hoc:
```
yarnpkg start
```

Build container:
```
docker build -t spacething .
```

Run container interactively:
```
docker run -it --rm spacething
```

Run container in cron:
```
docker run -t --rm spacething
```
