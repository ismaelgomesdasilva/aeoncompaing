'use client'
import React from 'react'
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore'
import { db } from '@/services/firebase'
import { useRouter } from 'next/navigation'
import { ICampaignParams } from '@/types/type'

export function useCampaignRedirect({
  searchParams,
  params,
}: ICampaignParams): void {
  const router = useRouter()
  console.log(params, 'params')
  React.useEffect(() => {
    if (!searchParams.id) return
    const handleCampaign = async () => {
      const campaignRes = await getDocs(collection(db, 'campaign'))
      const campaignResData = campaignRes.docs.map(async (docResponse) => {
        const currentCampaign = docResponse.data()
        const CAMPAIGN_NAME = currentCampaign?.name
          ?.toLocaleLowerCase()
          ?.trim()
          .replaceAll(' ', '-')

        if (
          currentCampaign.id !== searchParams.id ||
          CAMPAIGN_NAME !== params?.campanha
        ) {
          return currentCampaign
        }
        const campaignRef = doc(db, 'campaign', docResponse.id)
        const currentLink = currentCampaign.current_link

        // const localStorageId = localStorage.getItem('campaignId')
        // if (localStorageId === currentCampaign.id) {
        //   return currentCampaign
        // }
        // localStorage.setItem('campaignId', currentCampaign.id)

        if (
          Number(currentCampaign.max_count) <= Number(currentCampaign.count)
        ) {
          if (currentCampaign.link.length - 1 === currentLink) {
            console.log('ÚLTIMO LINK DA CAMPANHA - SIM')
            const updateCampaign = {
              ...currentCampaign,
              count: 0,
              current_link: 0,
            }

            await updateDoc(campaignRef, updateCampaign)
            router.push(
              `/${CAMPAIGN_NAME}/${currentCampaign.link[0]}?id=${currentCampaign?.id}`,
            )
          } else {
            console.log('ÚLTIMO LINK DA CAMPANHA - NÃO')
            const updateCampaign = {
              ...currentCampaign,
              count: 0,
              current_link: currentLink + 1,
            }

            await updateDoc(campaignRef, updateCampaign)
            router.push(
              `/${CAMPAIGN_NAME}/${currentCampaign.link[currentLink + 1]}?id=${
                currentCampaign?.id
              }`,
            )
          }
        } else {
          const updateCampaign = {
            ...currentCampaign,
            count: currentCampaign.count + 1,
          }
          await updateDoc(campaignRef, updateCampaign)
          router.push(
            `/${CAMPAIGN_NAME}/${currentCampaign.link[currentLink]}?id=${currentCampaign?.id}`,
          )
          console.log(currentCampaign)
        }
      })
    }
    const delayRedirect = setTimeout(() => {
      handleCampaign()
    }, 2000)

    return () => clearTimeout(delayRedirect)
  }, [searchParams.id])
}
