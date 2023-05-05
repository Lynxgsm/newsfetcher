"use client";

import React, { FormEvent } from "react";
import Input from "../FormElements/Input";
import Button from "../Button";
import { DateTime } from "luxon";
import { Article } from "@/types/article";
import { useSnapshot } from "valtio";
import { states } from "@/states";
import Spinner from "../Spinner";
import { formatFormToObject } from "@/utils/form";

const FetchForm = () => {
  const { setArticles, loading, toggleLoading } = useSnapshot(states);
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const input = formatFormToObject(formData);

    toggleLoading();
    const result = await fetch("/api/news", {
      method: "POST",
      body: JSON.stringify(input),
    });

    const jsonData = (await result.json()) as Article[];

    if (jsonData.length > 0) {
      setArticles(jsonData);
    }

    toggleLoading();
  };

  const now = DateTime.fromJSDate(new Date(Date.now())).toFormat("yyyy-MM-dd");

  return (
    <form onSubmit={handleSubmit} className="flex gap-4 p-8 items-center">
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
        defaultValue={"politique,economie"}
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
