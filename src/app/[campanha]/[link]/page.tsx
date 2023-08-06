'use client'
import { useEffect, useState } from 'react'
import { db } from '@/services/firebase'
import { collection, getDocs } from 'firebase/firestore'
// REMOVER ANY TIPAGEM - VERIFICAR NO NEXT ESSA TIPAGEM
export default function Page({ params, searchParams }: any) {
  const [currentCampaign, setCurrentCampaign] = useState({} as any)
  console.log(params, 'params')
  console.log(searchParams, 'searchParams')
  useEffect(() => {
    const handleCampaign = async () => {
      const campaignRes = await getDocs(collection(db, 'campaign'))

      const campaignResData = campaignRes.docs.map((docResponse) => {
        if (docResponse.data().id !== searchParams.id) return docResponse.data()
        setCurrentCampaign(docResponse.data())
        return docResponse.data()
      })
    }

    handleCampaign()
  }, [])

  const hasLink = currentCampaign?.link?.includes(params.link)

  if (!currentCampaign?.id || !hasLink) return <div>LINK INVALIDO</div>

  return <div>BEM VINDO AO LINK: {params.link}</div>
}
