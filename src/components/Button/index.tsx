export function Button({ step, handleStepChange, onSubmit }: any) {
  return (
    <>
      {step > 1 && step < 4 && (
        <button
          className="bg-transparent hover:bg-gray-200 text-gray-800 font-semibold w-20 h-10 border border-gray-400 rounded-xl"
          onClick={() => handleStepChange('previous')}
        >
          Voltar
        </button>
      )}

      {step < 3 ? (
        <button
          className="p-2 bg-blue-500 hover:bg-blue-700 rounded-xl w-20"
          onClick={() => handleStepChange('next')}
        >
          Avançar
        </button>
      ) : step === 3 ? (
        <button
          className="p-2 bg-blue-500 hover:bg-blue-700 rounded-xl w-20"
          onClick={onSubmit}
        >
          Enviar
        </button>
      ) : null}
    </>
  )
}
