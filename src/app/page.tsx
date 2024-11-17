'use client'

import { useState } from 'react';
import NavBar from "@/components/NavBar";
import { useSignMessage } from 'wagmi';
import { keccak256 } from 'viem';


export default function Home() {
  const [success, setSuccess] = useState(false);
  const [failure, setFailure] = useState(false);
  const [failureMsg, setFailureMsg] = useState("");
  const [secret, setSecret] = useState("");

  const { signMessageAsync } = useSignMessage();

  const handleSubmit = async () => {
    try {
      if (!secret) {
        throw new Error("Please enter a secret");
      }

      if (secret.length < 12) {
        throw new Error("Make your secret longer");
      }

      const signedMessage = await signMessageAsync({
        message: secret,
      });

      console.log(keccak256(signedMessage));

      setSuccess(true);
      setFailure(false);
      setSecret("");

    } catch (error: unknown) {
      if (error instanceof Error) {
        setFailureMsg(error.message);
      } else if (typeof error === 'string') {
        setFailureMsg(error);
      } else {
        setFailureMsg("An unknown error occurred");
        console.error("Unexpected error:", error);
      }

      setSuccess(false);
      setFailure(true);
    }
  };

  return (
    <div>
      <NavBar />
      <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
          <form className="w-full max-w-sm">
            <div className="p-4 rounded-lg shadow-md bg-neutral-800">
              <div className="flex mb-2">
                <div className="flex-1">
                  <input
                    type="password"
                    id="hs-strong-password-with-indicator-and-hint"
                    className="py-3 px-4 block w-full border-gray-100 rounded-md text-sm focus:border-blue-400 focus:ring-blue-400 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-400 dark:border-neutral-400 dark:text-neutral-600 dark:placeholder-neutral-400 dark:focus:ring-neutral-500"
                    value={secret}
                    onChange={e => setSecret(e.target.value)}
                  />
                  <div id="hs-strong-password" data-hs-strong-password='{
                        "target": "#hs-strong-password-with-indicator-and-hint",
                        "hints": "#hs-strong-password-hints",
                        "stripclassNamees": "hs-strong-password:opacity-100 hs-strong-password-accepted:bg-teal-500 h-2 flex-auto rounded-full bg-blue-500 opacity-50 mx-1"
                      }' className="flex mt-2 -mx-1"></div>
                </div>
              </div>

              <div id="hs-strong-password-hints" className="mb-3">
                <div>
                  <span className="text-sm text-gray-800 dark:text-neutral-200">Level:</span>
                  <span data-hs-strong-password-hints-weakness-text='["Empty", "Weak", "Medium", "Strong", "Very Strong", "Super Strong"]' className="text-sm font-semibold text-gray-800 dark:text-neutral-200"></span>
                </div>

                <h4 className="my-2 text-sm font-semibold text-gray-800 dark:text-white">
                  Your password must contain:
                </h4>

                <ul className="space-y-1 text-sm text-gray-500 dark:text-neutral-500">
                  <li data-hs-strong-password-hints-rule-text="min-length" className="hs-strong-password-active:text-teal-500 flex items-center gap-x-2">
                    <span className="hidden" data-check="">
                      <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </span>
                    <span data-uncheck="">
                      <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M18 6 6 18"></path>
                        <path d="m6 6 12 12"></path>
                      </svg>
                    </span>
                    Minimum number of characters is 12 otherwise you are doxable.
                  </li>
                  <li data-hs-strong-password-hints-rule-text="lowercase" className="hs-strong-password-active:text-teal-500 flex items-center gap-x-2">
                    <span className="hidden" data-check="">
                      <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </span>
                    <span data-uncheck="">
                      <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M18 6 6 18"></path>
                        <path d="m6 6 12 12"></path>
                      </svg>
                    </span>
                    Should contain lowercase.
                  </li>
                  <li data-hs-strong-password-hints-rule-text="uppercase" className="hs-strong-password-active:text-teal-500 flex items-center gap-x-2">
                    <span className="hidden" data-check="">
                      <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </span>
                    <span data-uncheck="">
                      <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M18 6 6 18"></path>
                        <path d="m6 6 12 12"></path>
                      </svg>
                    </span>
                    Should contain uppercase.
                  </li>
                  <li data-hs-strong-password-hints-rule-text="numbers" className="hs-strong-password-active:text-teal-500 flex items-center gap-x-2">
                    <span className="hidden" data-check="">
                      <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </span>
                    <span data-uncheck="">
                      <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M18 6 6 18"></path>
                        <path d="m6 6 12 12"></path>
                      </svg>
                    </span>
                    Should contain numbers.
                  </li>
                  <li data-hs-strong-password-hints-rule-text="special-characters" className="hs-strong-password-active:text-teal-500 flex items-center gap-x-2">
                    <span className="hidden" data-check="">
                      <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </span>
                    <span data-uncheck="">
                      <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M18 6 6 18"></path>
                        <path d="m6 6 12 12"></path>
                      </svg>
                    </span>
                    Should contain special characters.
                  </li>
                </ul>
              </div>
            </div>
            <button
              className="w-full flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded"
              type="button"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </form>


          { success &&
            <div role="alert">
              <div className="bg-green-500 text-white font-bold rounded-t px-4 py-2">
                Completed
              </div>
              <div className="border border-t-0 border-green-400 rounded-b bg-green-100 px-4 py-3 text-green-700">
                <p>Added hash into membership set!</p>
              </div>
            </div>
          }

          { failure &&
            <div role="alert">
              <div className="bg-red-500 text-white font-bold rounded-t px-4 py-2">
                Oops
              </div>
              <div className="border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700">
                <p>{failureMsg}</p>
              </div>
            </div>
          }

        </main>
        <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
          { null }
        </footer>
      </div>
    </div>
  );
}
