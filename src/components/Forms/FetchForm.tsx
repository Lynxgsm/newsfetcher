"use client";

import React, { FormEvent, useState } from "react";
import Input from "../FormElements/Input";
import Button from "../Button";
import { DateTime } from "luxon";
import { Article } from "@/types/article";
import { useSnapshot } from "valtio";
import { states } from "@/states";
import Spinner from "../Spinner";
import { formatFormToObject } from "@/utils/form";
import Select from "../FormElements/Select";

const FetchForm = () => {
  const { setArticles, loading, toggleLoading } = useSnapshot(states);
  const [tag, setTag] = useState("toe-karena,politika");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const input = formatFormToObject(formData);

    input.tags = tag;

    toggleLoading();
    const result = await fetch("/api/news", {
      method: "POST",
      body: JSON.stringify(input),
    });

    if (result.status === 200) {
      const jsonData = (await result.json()) as Article[];

      if (jsonData.length > 0) {
        setArticles(jsonData);
      }
    }

    toggleLoading();
  };

  const now = DateTime.fromJSDate(new Date(Date.now())).toFormat("yyyy-MM-dd");

  return (
    <form onSubmit={handleSubmit} className="flex gap-4 p-8 items-center">
      <Select
        label="Source"
        name="source"
        onChange={(e) => {
          const value = e.currentTarget.value;
          if (value === "taratra") {
            setTag("toe-karena,politika");
            return;
          }

          setTag("politique,economie");
        }}
        options={[
          {
            display: "Taratra",
            value: "taratra",
          },
          {
            display: "Les nouvelles",
            value: "les-nouvelles",
          },
        ]}
      />
      <Input
        label="Date"
        defaultValue={now}
        name="date"
        type="date"
        max={now}
        required
      />
      <Input
        label="Tags"
        name="tags"
        placeholder="Separated by comma"
        value={tag}
        required
      />
      {loading ? (
        <Spinner />
      ) : (
        <Button customClass="py-[.6rem] mt-[1.4rem]">Start Fetching</Button>
      )}
    </form>
  );
};

export default FetchForm;
