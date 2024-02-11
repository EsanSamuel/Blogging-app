"use client";
import React, { useState, useEffect } from "react";
import { getProviders, signIn } from "next-auth/react";

type Provider = {
  id: string;
  name: string;
  type: string;
  signinUrl: string;
  callbackUrl: string;
  signinUrlParams?: Record<string, string> | undefined;
};

type Providers = Record<string, Provider>;

const AuthProvider = () => {
  const [providers, setProviders] = useState<Providers | null>(null);

  useEffect(() => {
    const setUpProvider = async () => {
      const res = await getProviders();
      setProviders(res);
    };
    setUpProvider();
  }, []);

  return (
    <div>
      {providers &&
        Object.values(providers).map((provider: Provider) => (
          <div className="">
            <button
              className="bg-[#407ef1] text-white px-5 py-2 rounded-[30px] w-full text-[15px]"
              key={provider.name}
              onClick={() => signIn(provider.id)}
            >
              Continue with Google
            </button>
          </div>
        ))}
    </div>
  );
};

export default AuthProvider;
