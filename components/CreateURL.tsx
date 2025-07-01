'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from 'sonner';

type FormData = {
  longUrl: string;
};

const CreateURL = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    let url = data.longUrl;

    // Add https:// if missing
    if (!/^https?:\/\//i.test(url)) {
      url = 'https://' + url;
    }

    fetch('/api/CreateShortURL', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ originalURL: url }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.shortURL) {
            toast.success("Shortened URL: " + data.shortURL);
        } else {
            toast.error("Error shortening URL: " + data.error);
        }
    })
    .catch(error => {
        toast.error("Error: " + error);
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-md mx-auto flex gap-2"
    >
      <div className="flex-1">
        <Input
          placeholder="Paste your long URL here..."
          {...register("longUrl", {
            required: "URL is required",
            pattern: {
              value: /^https?:\/\/|^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/,
              message: "Enter a valid URL",
            },
          })}
        />
        {errors.longUrl && (
          <p className="text-sm text-red-500 mt-1">
            {errors.longUrl.message}
          </p>
        )}
      </div>

      <Button type="submit">Shorten</Button>
    </form>
  );
};

export default CreateURL;
