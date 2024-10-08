type AuthButtonProps={
    btnTitle :string
}

export default function AuthButton({btnTitle}:AuthButtonProps){
    return (
        <button className="w-full py-3 text-white font-bold rounded bg-gradient-to-r from-[#FF5390] via-[#F5B341] to-[#68AF6B]">
            {btnTitle}
      </button>
    )
}