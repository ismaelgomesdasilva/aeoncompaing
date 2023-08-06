import Image from 'next/image'
import InputComponent from '../Input/input.component'
import { ISteps } from '@/types/type'

export function Steps({
  step,
  setCampaignName,
  setMaxCount,
  inputs,
  handleAddInput,
  handleRemoveInput,
  campaign,
  handleInputChange,
  handleRedirectHomePage,
  sucessIcon,
  CAMPAIGN_NAME,
}: ISteps) {
  return (
    <>
      {step === 1 && (
        <div className="flex flex-col w-full ">
          <h3 className="text-blue-950 font-semibold mb-3 ml-2 text-xl">
            Nome da Campanha
          </h3>
          <InputComponent
            placeholder="Insira o nome da campanha"
            onChange={(e) => setCampaignName(e.target.value)}
          />
        </div>
      )}
      {step === 2 && (
        <div className="flex flex-col w-full">
          <h3 className="text-blue-950 font-semibold mb-3 ml-2 text-xl">
            Quantidade de click
          </h3>

          <InputComponent
            type="number"
            placeholder="Insira a Quantidade de cliques"
            onChange={(e) => setMaxCount(Number(e.target.value))}
          />
        </div>
      )}
      {step === 3 && (
        <div className="flex flex-col w-full ">
          <h3 className="text-blue-950 font-semibold mb-3 ml-2 text-xl">
            Insira seu link
          </h3>
          <div>
            {inputs.map((input, index) => (
              <div className="flex flex-row-reverse" key={index}>
                {index === 0 && (
                  <button
                    className="bg-blue-900 w-10 rounded-full ml-2 h-11  "
                    onClick={handleAddInput}
                  >
                    +
                  </button>
                )}
                {index > 0 && (
                  <button
                    className="bg-red-800 w-10 rounded-full ml-2 h-11  "
                    onClick={() => handleRemoveInput(index)}
                  >
                    -
                  </button>
                )}
                <InputComponent
                  placeholder={`Link Nº${index + 1}`}
                  value={input}
                  onChange={(e) => handleInputChange(e, index)}
                />
              </div>
            ))}
          </div>
        </div>
      )}
      {step === 4 && (
        <div className="flex flex-col w-full ">
          <Image src={sucessIcon} className="m-auto" alt="" />
          <h3 className="text-blue-950 font-semibold mb-3 ml-2 text-xl text-center">
            Campanha criada com Sucesso
          </h3>
          <p className="text-blue-950 text-center mb-2">
            Copie ou clique no link abaixo
          </p>

          {!!campaign?.name && (
            <a
              className="text-blue-900 text-center mb-2"
              target="_blank"
              href={`http://localhost:3000/${CAMPAIGN_NAME}?id=${campaign.id}`}
              rel="noreferrer"
            >
              {`http://localhost:3000/${CAMPAIGN_NAME}?id=${campaign.id}`}
            </a>
          )}
          <button
            className="bg-blue-500 hover:bg-blue-700 rounded-2xl h-10"
            onClick={handleRedirectHomePage}
          >
            Inicio
          </button>
        </div>
      )}
    </>
  )
}
