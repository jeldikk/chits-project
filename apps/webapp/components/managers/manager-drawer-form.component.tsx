"use client";

import { createManagerAction, FormState } from "@/actions/managers.actions";
import {
  FormEvent,
  useActionState,
  useRef,
  useState,
  startTransition,
  useEffect,
} from "react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import useAuthDetailsContext from "@/hooks/auth-details.hook";
import { AuthDetailsContext } from "@/context/auth-details.context";
import { useAppSelector } from "@/redux/store";
import { selectAuthDetails } from "@/redux/auth/auth.selectors";
import { set } from "zod";

const initialState: FormState = {
  success: false,
  message: "",
  errors: null,
};

export default function ManagerDrawerForm() {
  const [checked, setChecked] = useState<boolean>(false);
  // const authDetails = useAuthDetailsContext();
  const authDetails = useAppSelector(selectAuthDetails);
  const [state, formAction, isPending] = useActionState<FormState, FormData>(
    createManagerAction,
    {
      success: false,
      message: "",
      errors: null,
    }
  );
  const [errors, setErrors] = useState(state.errors);

  useEffect(() => {
    if (!state.success) {
      setErrors(state.errors);
    } else {
      setChecked((val) => !val);
    }
  }, [state]);

  function handleDrawerToggle() {
    setChecked((val) => !val);
  }

  function handleFormSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = event.target;

    const formData = new FormData(event.currentTarget);
    // formData.append('name', event.currentTarget.get)

    startTransition(() => {
      formAction(formData);
    });
  }
  return (
    <div className="manager-drawer-form">
      <div className="drawer drawer-end">
        <input
          checked={checked}
          id="manager-drawer-toggle"
          type="checkbox"
          className="drawer-toggle"
        />
        <div className="drawer-content">
          <label
            htmlFor="manager-drawer-toggle"
            className="btn drawer-button btn-soft btn-info"
            onClick={handleDrawerToggle}
          >
            Create New Manager
          </label>
        </div>
        <div className="drawer-side">
          <label
            onClick={handleDrawerToggle}
            htmlFor="manager-drawer-toggle"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <div className="bg-base-200 min-h-full min-w-96">
            <div className="header-titles flex flex-row items-center justify-between p-4">
              <h4 className="text-xl font-bold">Create Manager</h4>
              <XMarkIcon
                className="size-6 cursor-pointer"
                onClick={handleDrawerToggle}
              />
            </div>
            {errors && (
              <div className="p-4">
                <div
                  role="alert"
                  className="flex justify-between alert alert-error my-1"
                >
                  <span>Error occurred while creating Manager</span>
                  <XMarkIcon
                    className="size-3 cursor-pointer"
                    onClick={() => setErrors(null)}
                  />
                </div>
              </div>
            )}
            <form onSubmit={handleFormSubmit} className="p-4">
              <input type="hidden" name="ownerId" value={authDetails?.userId} />
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Manager Name</legend>
                <input name="name" type="text" className="input w-full" />
              </fieldset>
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Manager Address</legend>
                <textarea
                  name="address"
                  className="textarea h-36 w-full"
                  placeholder="Address"
                />
              </fieldset>
              <div className="button-controls flex flex-col gap-2 my-4">
                <button type="submit" className="btn btn-primary">
                  {isPending && (
                    <span className="loading loading-spinner"></span>
                  )}
                  Create New
                </button>
                <button type="reset" className="btn btn-secondary">
                  Clear
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
