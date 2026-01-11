"use client";

import { useState, useEffect } from "react";
import { generateClient } from "aws-amplify/data";
import { Schema } from "@/data-schema";
import ManagerCard from "./manager-card.component";
import useAuthDetailsContext from "@/hooks/auth-details.hook";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { selectAuthDetails } from "@/redux/auth/auth.selectors";
import { selectManagersList } from "@/redux/managers/managers.selectors";
import { setManagers } from "@/redux/managers/managers.slice";

type Manager = Schema["Manager"]["type"];

const client = generateClient<Schema>();

export default function ManagersList() {
  const dispatch = useAppDispatch();
  //   const authDetails = useAuthDetailsContext();
  const authDetails = useAppSelector(selectAuthDetails);
  //   const [managers, setManagers] = useState<Manager[]>([]);
  const managers = useAppSelector(selectManagersList);

  useEffect(() => {
    const subscription = client.models.Manager.observeQuery({
      filter: {
        ownerId: {
          eq: authDetails?.userId,
        },
      },
    }).subscribe({
      next: (nextData) => {
        const { items, isSynced } = nextData;
        console.log({ items, isSynced });
        // setManagers([...items]);
        dispatch(setManagers([...items]));
      },
      error: (err) => {
        console.error(err);
      },
      complete: () => {
        console.log("Data is completely queried");
      },
    });
    console.log(subscription);
    return () => {
      subscription.unsubscribe();
    };
  }, []);
  return (
    <div className="manager-list p-4">
      <div className="grid grid-cols-5 grid-rows-4 gap-4">
        {managers.map((manager) => (
          <ManagerCard key={manager.id} data={manager} />
        ))}
      </div>
    </div>
  );
}
