"use client";

import React, { createContext, useContext, useRef, useEffect, useState } from "react";
import { Post } from "@/types";

// TODO-1: PostContextType 을 정의하고 적용하세요
// - PostContextType 은 context value 의 타입을 의미합니다.
// - createContext<any> 에서 any 대신 PostContextType | undefined 을 넣으세요
// - setPosts, setLoading 과 같은 setState 함수의 타입은 useState 실행한 곳의 setPosts 에 마우스오버해서 타입확인해서 복사 붙여넣으세요

interface PostContextType {
  posts: Post[];
  setPosts: React.Dispatch<React.SetStateAction<Post[]>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  error: string | null;
  setError: React.Dispatch<React.SetStateAction<string | null>>;
  refreshPosts: () => Promise<void>;
}

const PostContext = createContext<PostContextType | undefined>(undefined);

// TODO-2: PostProvider 의 props 타입을 정의하세요
export function PostProvider({ children }: { children: React.ReactNode }) {
  // TODO-3: useState 의 초기 상태값의 타입과 useRef 의 타입을 제네릭으로 정의하세요
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const mountedRef = useRef<boolean>(false);

  useEffect(() => {
    mountedRef.current = true;

    return (): void => {
      mountedRef.current = false;
    };
  }, []);

  const refreshPosts = async (): Promise<void> => {
    setLoading(true);
    setError(null);

    try {
      // 실제 API 호출은 컴포넌트에서 처리
      console.log("Context에서 posts 새로고침 요청");
    } catch (err) {
      if (mountedRef.current) {
        setError(err instanceof Error ? err.message : "Unknown error occurred");
      }
    } finally {
      if (mountedRef.current) {
        setLoading(false);
      }
    }
  };

  const contextValue = {
    posts,
    setPosts,
    loading,
    setLoading,
    error,
    setError,
    refreshPosts,
  };

  return (
    <PostContext.Provider value={contextValue}>{children}</PostContext.Provider>
  );
}

// useContext 훅 타입 정의 예시
export function usePostContext() {
  const context = useContext(PostContext);

  if (context === undefined) {
    throw new Error("usePostContext must be used within a PostProvider");
  }

  return context;
}
