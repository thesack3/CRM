import {useRouter} from 'next/router'


export default function Project() {

  const router = useRouter()
  const {query} = router;

  const id = query.id;

  



  return (
    <div>

{id}
      

    </div>
  )
}
