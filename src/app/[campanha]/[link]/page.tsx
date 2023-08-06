/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import React from 'react'

import { db } from '@/services/firebase'
import { collection, getDocs } from 'firebase/firestore'

import { ICampaign, ICampaignParams } from '@/types/type'

import LinkIcon from '../../../../public/link.svg'

import Image from 'next/image'
export default function Page({ params, searchParams }: ICampaignParams) {
  const [currentCampaign, setCurrentCampaign] = React.useState<ICampaign>()
  console.log(currentCampaign, 'currentCampaign')
  React.useEffect(() => {
    const handleCampaign = async () => {
      const campaignRes = await getDocs(collection(db, 'campaign'))
      const campaignResData = campaignRes.docs.map((docResponse) => {
        const data = docResponse.data() as ICampaign
        if (data.id !== searchParams.id) return data
        setCurrentCampaign(data)
        return data
      })
    }

    handleCampaign()
  }, [searchParams.id])

  const hasLink = currentCampaign?.link?.includes(params.link)

  if (!currentCampaign?.id || !hasLink) {
    console.log(!currentCampaign?.id || !hasLink)
    return null // ou qualquer outra manipulação de erro que você queira fazer
  }
  return (
    <div className="bg-slate-100 h-screen flex justify-center aling-center items-center">
      <div className="bg-white drop-shadow-md   rounded-3xl p-20">
        <div className="text-center flex justify-center flex-col aling-center">
          <Image src={LinkIcon} className="m-auto" alt="logo de link"></Image>
          <h2 className="text-blue-950 font-semibold mb-3 ml-2 text-xl">
            Bem vindo ao link:&nbsp;{params.link}
            <br />
            &nbsp;da Campanha:&nbsp;
            {params.campanha}
          </h2>
        </div>
      </div>
    </div>
  )
}
