import React, { useEffect, useState } from "react";
import axiosInstance from "../libs/axiosInstance";
import styled from "styled-components";

const LikeButton = styled.button`
  background: ${({ liked }) => (liked ? "#ffe3e3" : "#e3f0ff")};
  color: ${({ liked }) => (liked ? "#d32f2f" : "#1976d2")};
  border: none;
  border-radius: 6px;
  padding: 6px 14px;
  margin-left: 8px;
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s;
  &:disabled {
    background: #eee;
    color: #aaa;
    cursor: not-allowed;
  }
`;

const ActionButton = styled.button`
  background: #f5f5f5;
  color: #333;
  border: 1px solid #ddd;
  border-radius: 6px;
  padding: 6px 14px;
  margin-right: 8px;
  font-size: 15px;
  cursor: pointer;
  transition: background 0.2s;
  &:hover:not(:disabled) {
    background: #e3f0ff;
    color: #1976d2;
  }
  &:disabled {
    background: #eee;
    color: #aaa;
    cursor: not-allowed;
  }
`;

export default function PostList({ member, board }) {
  const [posts, setPosts] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editForm, setEditForm] = useState({ title: "", content: "" });
  const [likedPosts, setLikedPosts] = useState([]); // 내가 좋아요 누른 postId 목록

  // 게시글 목록 조회
  const fetchPosts = async () => {
    if (!board) return;
    try {
      const res = await axiosInstance.get(`/boards/${board.boardId ?? board.id}/posts`);
      setPosts(res.data);
    } catch (err) {
      alert("게시글 목록 조회 실패: " + (err.response?.data?.message || err.message));
    }
  };

  useEffect(() => {
    fetchPosts();
    setLikedPosts([]); // 게시판 바뀌면 초기화
  }, [board]);

  // 게시글 삭제
  const handleDelete = async (id) => {
    await axiosInstance.delete(`/posts/${id}`);
    fetchPosts();
  };

  // 게시글 수정
  const handleEdit = async (id) => {
    await axiosInstance.put(`/posts/${id}`, {
      title: editForm.title,
      content: editForm.content,
    });
    setEditId(null);
    fetchPosts();
  };

  // 게시글 좋아요
  const handleLike = async (id) => {
    if (!member || member.memberId === undefined) return;
    try {
      await axiosInstance.post(`/posts/${id}/hearts`, {
        memberId: member.memberId,
      });
      setLikedPosts((prev) => [...prev, id]);
    } catch (err) {
      alert("좋아요 실패: " + (err.response?.data?.message || err.message));
    }
  };

  // 게시글 좋아요 취소
  const handleUnlike = async (id) => {
    if (!member || member.memberId === undefined) return;
    try {
      await axiosInstance.delete(`/posts/${id}/hearts`);
      setLikedPosts((prev) => prev.filter(pid => pid !== id));
    } catch (err) {
      alert("좋아요 취소 실패: " + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div>
      <h3>게시글 목록</h3>
      {(!board || posts.length === 0) && <div>게시글이 없습니다.</div>}
      <ul>
        {posts.map(post => {
          const postId = post.postId ?? post.id;
          const liked = likedPosts.includes(postId);
          return (
            <li key={postId} style={{ marginBottom: 16, borderBottom: "1px solid #eee", paddingBottom: 8 }}>
              {editId === postId ? (
                <>
                  <input
                    value={editForm.title}
                    onChange={e => setEditForm(f => ({ ...f, title: e.target.value }))}
                  />
                  <input
                    value={editForm.content}
                    onChange={e => setEditForm(f => ({ ...f, content: e.target.value }))}
                  />
                  <ActionButton onClick={() => handleEdit(postId)}>저장</ActionButton>
                  <ActionButton onClick={() => setEditId(null)}>취소</ActionButton>
                </>
              ) : (
                <>
                  <div style={{ fontWeight: "bold" }}>{post.title}</div>
                  <div>{post.content}</div>
                  <div>
                    <ActionButton onClick={() => { setEditId(postId); setEditForm({ title: post.title, content: post.content }); }}>수정</ActionButton>
                    <ActionButton onClick={() => handleDelete(postId)}>삭제</ActionButton>
                    {liked ? (
                      <LikeButton
                        liked
                        onClick={() => handleUnlike(postId)}
                        disabled={!member || member.memberId === undefined}
                      >
                        ❤️ 좋아요 취소
                      </LikeButton>
                    ) : (
                      <LikeButton
                        onClick={() => handleLike(postId)}
                        disabled={!member || member.memberId === undefined}
                      >
                        🤍 좋아요
                      </LikeButton>
                    )}
                  </div>
                </>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}