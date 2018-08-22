For deploying the front-end client, you can run:

```
npm run build
cd build
surge ./ $(cat ../../CNAME)
```
