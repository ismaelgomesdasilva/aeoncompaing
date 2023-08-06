'use client'
import React from 'react'
import ReactLoading from 'react-loading'
import { useCampaignRedirect } from '../../hooks/useCampaignRedirect'
import { ICampaignParams } from '../../types/type'

export default function Campanha({ params, searchParams }: ICampaignParams) {
  useCampaignRedirect({ searchParams, params })
  return (
    <div className="bg-slate-100 h-screen flex justify-center aling-center items-center">
      <div className="text-center flex justify-center flex-col aling-center">
        <h2 className="text-blue-950 font-semibold mb-3 ml-2 text-xl">
          Bem vindo a campanha:&nbsp;
          {params.campanha}
        </h2>
        <p className=" text-slate-400">
          SEU REDIRECIONAMENTO SERA FEITO EM BREVE...
        </p>
        <ReactLoading
          className="m-auto text-blue-950"
          type="bubbles"
          color="#3B82F6"
          width={150}
        />
      </div>
    </div>
  )
}
