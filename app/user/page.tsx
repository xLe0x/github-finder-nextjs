"use client";

import { useEffect, useState } from "react";

type GithubUser = {
  avatar_url: string;
  followers: number;
  following: number;
  public_repos: number;
  bio: string;
  name: string;
};

interface repo {
  homepage: string;
  name: string;
  id: number;
  html_url: string;
}

export default function UserPage() {
  const [username, setUserName] = useState("");
  const [user, setUser] = useState<GithubUser>();
  const [repos, setRepos] = useState([]);
  function handleInput(e: any) {
    if (e.key === "Enter") {
      if (e.target.value !== "") {
        setUserName(e.target.value);
      }
    }
  }

  useEffect(() => {
    if (username !== "")
      fetch(`https://api.github.com/users/${username}`)
        .then((res) => res.json())
        .then((data) => {
          setUser(data);
        });
  }, [username]);

  function handleForm(e: any) {
    e.preventDefault();
    handleInput(e);
  }

  function fetchRepos() {
    if (username !== "")
      fetch(`https://api.github.com/users/${username}/repos`)
        .then((res) => res.json())
        .then((data) => {
          setRepos(data);
        });
  }

  return (
    <div className="h-screen w-screen mx-auto">
      <div className="container grid place-content-center gap-3">
        <h1 className="text-center">GITHUB FINDER</h1>
        <p>press `Enter` to show data</p>
        <input
          type="text"
          className="focus-within:outline-none focus-within:border-green-300 border-2 border-gray-800 rounded m-2"
          onKeyDown={(e) => handleInput(e)}
        />
        <div className="info mx-auto flex flex-col item-center gap-2">
          <div className="name text-center">
            <h3>
              {username && user && (
                <p>
                  {username} ({user?.name})
                </p>
              )}
            </h3>
          </div>
          <div className="img w-32 h-32 mx-auto">
            <img src={user?.avatar_url} alt="" className="rounded-full" />
          </div>
          <div className="follow ml-2 flex items-center justify-between gap-2">
            {username && user && <p> Followers: {user?.followers}</p>}
            {username && user && <p> Following: {user?.following}</p>}
          </div>
          {username && user && (
            <p className="mx-auto">Public Repos : {user?.public_repos}</p>
          )}
        </div>
        {username && user && (
          <div className="btns my-4 gap-3 flex items-center justify-center">
            <a
              href={user?.avatar_url}
              download
              target="_blank"
              className="btn px-2 py-1 bg-gray-400 rounded text-white"
            >
              download image
            </a>
            <button
              className="btn px-2 py-1 bg-orange-400 rounded text-white"
              onClick={() => fetchRepos()}
            >
              fetch repos
            </button>
          </div>
        )}
        <div className="repos flex flex-col gap-4 items-center">
          {!!repos &&
            repos.map((repo: repo) => {
              return (
                <div
                  key={repo.id}
                  className="repo p-5 bg-gray-300 rounded flex flex-col items-center "
                >
                  <h4>Repo Name : {repo.name}</h4>
                  {repo.html_url && (
                    <a href={repo.html_url} className="underline">
                      REPO URL
                    </a>
                  )}
                  {repo.homepage && (
                    <a href={repo.homepage} className="underline">
                      LIVE URL
                    </a>
                  )}
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}
