"use client";

import { Article } from "@/types/article";
import React, { FC } from "react";
import Input from "./FormElements/Input";
import { useSnapshot } from "valtio";
import { states } from "@/states";
import TextArea from "./FormElements/Textarea";

const NewsList = () => {
  const { articles } = useSnapshot(states);
  return (
    <div className="flex flex-col gap-4 border-b-[1px]">
      {articles.map((article, index) => (
        <NewsItem key={index} {...article} />
      ))}
    </div>
  );
};

const NewsItem: FC<Article> = (props) => {
  return (
    <div className="flex flex-col gap-4 p-8 border-b-[1px]">
      <div className="flex gap-4">
        <div>
          <img src={props.cover_image} alt={props.title} />
        </div>
        <div className="w-2/3">
          <Input label="Title" defaultValue={props.title} />
          <div className="flex gap-2 my-2">
            <Input label="Tag" defaultValue={props.tag} />
            <Input label="Date" defaultValue={props.date} />
            <Input label="Author" defaultValue={props.author} />
          </div>
          <Input label="Link" defaultValue={props.link} />
          <TextArea cols={6} defaultValue={props.content} label="Content" />
        </div>
      </div>
    </div>
  );
};

export default NewsList;
