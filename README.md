I made this thing to check whether there were tickets for the VIP tour
of the Johnson Space Center available for a particluar day.

Build:
```
docker build -t spacething .
```

Run interactively:
```
docker run -it --rm spacething
```

Run in cron:
```
docker run -t --rm spacething
```
