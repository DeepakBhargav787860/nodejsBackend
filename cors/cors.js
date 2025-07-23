
const CorsFun=()=>{
  return {
  origin: ['https://react-node-zeta.vercel.app', 'http://localhost:5173'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}

}
module.exports=CorsFun