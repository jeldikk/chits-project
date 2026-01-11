"use client";
import { createCheetiAction } from "@/actions/cheeti-lu.actions";
import {
  selectManagersList,
  selectManagersLoading,
} from "@/redux/managers/managers.selectors";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { fetchManagers } from "@/redux/managers/managers.thunks";
import { useTransition, useActionState, useEffect, useRef } from "react";
import { setManagers } from "@/redux/managers/managers.slice";
import { useForm, SubmitHandler } from "react-hook-form";
import { createPayloadSchema } from "@/schemas/cheeti-lu.schema";
import { z } from "zod";
import { selectAuthDetails } from "@/redux/auth/auth.selectors";

export default function CheetiForm() {
  const {
    register,
    handleSubmit,
    watch,
    getValues,
    formState: { errors },
  } = useForm<z.output<typeof createPayloadSchema>>();
  const [formState, formAction] = useActionState(createCheetiAction, {
    success: false,
  });
  const [isPending, startTransition] = useTransition();
  const formRef = useRef<HTMLFormElement>(null);
  const managers = useAppSelector(selectManagersList);
  const managersLoading = useAppSelector(selectManagersLoading);
  const authDetails = useAppSelector(selectAuthDetails);
  const dispatch = useAppDispatch();
  useEffect(() => {
    // if managers list is zero, we have to fetch data here
    if (!managers.length) {
      dispatch(fetchManagers())
        .unwrap()
        .then(async (response) => {
          const parsedBody = await response.json();
          dispatch(setManagers(parsedBody.data));
        });
    }
  }, []);

  function handleOnSubmitForm(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    handleSubmit((payload) => {
      startTransition(() => {
        formAction(new FormData(formRef.current!));
      });
    })(event);
  }

  return (
    <form ref={formRef} action={formAction} onSubmit={handleOnSubmitForm}>
      <input type="hidden" name="ownerId" value={authDetails?.userId} />
      <fieldset className="fieldset bg-base-300 p-4 my-2">
        <legend className="fieldset-legend">Select the Manager</legend>
        {managersLoading ? (
          <div className="flex justify-center items-center h-8 w-full">
            <span className="loading loading-dots loading-xl"></span>
          </div>
        ) : (
          <div className="flex flex-row gap-2 overflow-x-auto whitespace-nowrap p-4">
            {managers.map((mgr) => (
              <div key={mgr.id} className="flex flex-row">
                <input
                  type="radio"
                  name="managerId"
                  value={mgr.id}
                  className="radio"
                />
                <p className="font-bold p-1">{mgr.name}</p>
              </div>
            ))}
          </div>
        )}
      </fieldset>
      <fieldset className="fieldset flex flex-row bg-base-100 border-base-300 p-4 my-2">
        <legend className="fieldset-legend">Cheeti Basic Details</legend>

        <div className="form-control flex flex-col flex-1">
          <label htmlFor="name" className="label">
            <span className="label-text">Cheeti Name</span>
          </label>
          <input
            {...register("name", {
              required: {
                value: true,
                message: "Cheeti Name is a required entity",
              },
            })}
            type="text"
            className="input w-full"
          />
          <label className="label">
            {errors && errors.name && errors.name.type === "required" && (
              <span className="label-text-alt text-error">
                {errors.name.message}
              </span>
            )}
          </label>
        </div>

        <div className="form-control flex flex-col flex-1">
          <label className="label">
            <span className="label-text">Cheeti Value</span>
          </label>
          <input
            {...register("value", {
              required: { value: true, message: "Cheeti Value is required" },
              min: {
                value: 1000,
                message: "Atleast value should be more than 1000",
              },
            })}
            type="number"
            className="input w-full"
          />
          <label className="label">
            {/* {errors && errors.value && errors.value.type === "required" && (
              <span className="label-text-alt text-error">
                {errors.value.message}
              </span>
            )} */}
            {errors && errors.value && (
              <span className="label-text-alt text-error">
                {errors.value.message}
              </span>
            )}
          </label>
        </div>
      </fieldset>

      <fieldset className="grid grid-cols-2 grid-rows-2 gap-4 bg-base-100 border-base-300 p-3">
        <legend className="fieldset-legend">Tenure and Subscription</legend>

        <fieldset className="fieldset bg-base-300 p-4 flex flex-row">
          <legend className="fieldset-legend">Cheeti Start Details</legend>

          <div className="form-control flex flex-col flex-1">
            <label className="label">
              <span className="label-text">Cheeti Start Month</span>
            </label>
            <select
              {...register("startDetails.month", {
                required: {
                  value: true,
                  message: "Start Month is required",
                },
              })}
              className="select w-full"
            >
              <option disabled>Select Start Month</option>
              <option value={1}>January</option>
              <option value={2}>February</option>
              <option value={3}>March</option>
              <option value={4}>April</option>
              <option value={5}>May</option>
              <option value={6}>June</option>
              <option value={7}>July</option>
              <option value={8}>August</option>
              <option value={9}>September</option>
              <option value={10}>October</option>
              <option value={11}>November</option>
              <option value={12}>December</option>
            </select>
            <label className="label">
              {/* <span className="label-text-alt">Error Message</span> */}
              {errors && errors.startDetails?.month && (
                <span className="label-text-alt text-error">
                  {errors.startDetails?.month.message}
                </span>
              )}
            </label>
          </div>

          <div className="form-control flex flex-col flex-1">
            <label className="label">
              <span className="label-text">Cheeti Start Year</span>
            </label>
            <select
              {...register("startDetails.year", {
                required: { value: true, message: "Start Year is required" },
              })}
              defaultValue={2020}
              className="select w-full"
            >
              <option value={2020}>2020</option>
              <option value={2021}>2021</option>
              <option value={2022}>2022</option>
              <option value={2024}>2024</option>
              <option value={2025}>2025</option>
              <option value={2026}>2026</option>
              <option value={2027}>2027</option>
              <option value={2028}>2028</option>
              <option value={2029}>2029</option>
              <option value={2030}>2030</option>
              <option value={2031}>2031</option>
              <option value={2032}>2032</option>
              <option value={2033}>2033</option>
              <option value={2034}>2034</option>
            </select>
            <label className="label">
              {/* <span className="label-text-alt">Error Message</span> */}
              {errors && errors.startDetails?.year && (
                <span className="label-text-alt text-error">
                  {errors.startDetails?.year.message}
                </span>
              )}
            </label>
          </div>
        </fieldset>

        <fieldset className="fieldset p-2">
          <legend className="fieldset-legend">Cheeti Tenure ( months )</legend>
          <input
            {...register("tenure", {
              required: {
                value: true,
                message: "Cheeti Tenure value is missing",
              },
            })}
            type="number"
            className="input w-full"
          />
          <label className="label">
            {errors && errors.tenure && (
              <span className="label-text-alt text-error">
                {errors.tenure.message}
              </span>
            )}
          </label>
        </fieldset>

        <fieldset className="fieldset bg-base-300 p-4 flex flex-row">
          <legend className="fieldset-legend">Cheeti End Details</legend>

          <div className="form-control flex flex-col flex-1">
            <label className="label">
              <span className="label-text">Cheeti End Month</span>
            </label>
            <select
              {...register("endDetails.month", {
                required: { value: true, message: "Ending Month is required" },
              })}
              defaultValue={"Select End Month"}
              className="select w-full"
            >
              <option disabled>Select End Month</option>
              <option value={1}>January</option>
              <option value={2}>February</option>
              <option value={3}>March</option>
              <option value={4}>April</option>
              <option value={5}>May</option>
              <option value={6}>June</option>
              <option value={7}>July</option>
              <option value={8}>August</option>
              <option value={9}>September</option>
              <option value={10}>October</option>
              <option value={11}>November</option>
              <option value={12}>December</option>
            </select>
            <label className="label">
              {/* <span className="label-text-alt">Error Message</span> */}
              {errors && errors.endDetails?.month && (
                <span className="label-text-alt text-error">
                  {errors.endDetails?.month.message}
                </span>
              )}
            </label>
          </div>

          <div className="form-control flex flex-col flex-1">
            <label className="label">
              <span className="label-text">Cheeti End Year</span>
            </label>
            <select
              {...register("endDetails.year", {
                required: {
                  value: true,
                  message: "End year is required",
                },
              })}
              defaultValue={2020}
              className="select w-full"
            >
              <option value={2020}>2020</option>
              <option value={2021}>2021</option>
              <option value={2022}>2022</option>
              <option value={2024}>2024</option>
              <option value={2025}>2025</option>
              <option value={2026}>2026</option>
              <option value={2027}>2027</option>
              <option value={2028}>2028</option>
              <option value={2029}>2029</option>
              <option value={2030}>2030</option>
              <option value={2031}>2031</option>
              <option value={2032}>2032</option>
              <option value={2033}>2033</option>
              <option value={2034}>2034</option>
            </select>
            <label className="label">
              {/* <span className="label-text-alt">Error Message</span> */}
              {errors && errors.endDetails?.year && (
                <span className="label-text-alt text-error">
                  {errors.endDetails?.year.message}
                </span>
              )}
            </label>
          </div>
        </fieldset>

        <fieldset className="fieldset p-2">
          <legend className="fieldset-legend">
            Cheeti Subscription Amount
          </legend>
          <input
            {...register("subscriptionAmount", {
              required: {
                value: true,
                message: "Subscription amount is missing",
              },
            })}
            type="number"
            className="input w-full"
          />
          <label className="label">
            {/* <span className="label-text-alt">Error Message</span> */}
            {errors.subscriptionAmount && (
              <span className="label-text-alt text-error">
                {errors.subscriptionAmount.message}
              </span>
            )}
          </label>
        </fieldset>
      </fieldset>

      <div className="grid grid-cols-3 gap-2 p-4">
        {/* cheeti pata date */}
        <fieldset className="fieldset p-2">
          <legend className="fieldset-legend">Cheeti Paata Date</legend>
          <input
            {...register("paataDate", {
              required: {
                value: true,
                message: "Paata Date is missing",
              },
              min: {
                value: 1,
                message: "Date cannot be lesser than 1",
              },
              max: {
                value: 27,
                message: "Date cannot be greater than 27",
              },
            })}
            type="number"
            className="input w-full"
          />
          <label className="label">
            {/* <span className="label-text-alt">Error Message</span> */}
            {errors.paataDate && (
              <span className="label-text-alt text-error">
                {errors.paataDate.message}
              </span>
            )}
          </label>
        </fieldset>
        {/* cheeti manager paata month */}
        <fieldset className="fieldset p-2">
          <legend className="fieldset-legend">Cheeti Manager Paata</legend>
          <input
            {...register("managerPaata", {
              required: {
                value: true,
                message: "Manager Paata number is missing",
              },
            })}
            type="number"
            className="input w-full"
          />
          <label className="label">
            {/* <span className="label-text-alt">Error Message</span> */}
            {errors.managerPaata && (
              <span className="label-text-alt text-error">
                {errors.managerPaata.message}
              </span>
            )}
          </label>
        </fieldset>
        {/* cheeti total people */}
        <fieldset className="fieldset p-2">
          <legend className="fieldset-legend">Cheeti Total Members</legend>
          <input
            {...register("memberCount", {
              required: {
                value: true,
                message: "We need total number of people involved in cheeti",
              },
            })}
            type="number"
            className="input w-full"
          />
          <label className="label">
            {/* <span className="label-text-alt">Error Message</span> */}
            {errors && errors.memberCount && (
              <span className="label-text-alt text-error">
                {errors.memberCount?.message}
              </span>
            )}
          </label>
        </fieldset>
      </div>
      {!managersLoading && (
        <div className="button-controls p-4 flex">
          <button
            type="submit"
            className={`btn btn-primary mx-2 flex-1 ${isPending ? "btn-disabled" : ""} `}
          >
            {isPending ? (
              <span className="loading loading-spinner"></span>
            ) : null}
            Create
          </button>
          <button
            type="reset"
            className={`btn btn-secondary flex-1 ${isPending ? "btn-disabled" : ""}`}
          >
            Clear
          </button>
        </div>
      )}
    </form>
  );
}
