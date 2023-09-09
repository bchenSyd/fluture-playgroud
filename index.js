import {readFile} from 'fs'
import {node, encase, chain, map, fork} from 'fluture'

const getPackageName = file => (
  node (done => { readFile (file, 'utf8', done) })
  .pipe (chain (encase (JSON.parse)))
  .pipe (map (x => x.name))
)

getPackageName ('package.json')
.pipe (fork (console.error) (console.log))