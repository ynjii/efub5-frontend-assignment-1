import React, { useEffect, useState } from "react";
import axiosInstance from "../libs/axiosInstance";

export default function PostList({ member, board }) {
  const [posts, setPosts] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editForm, setEditForm] = useState({ title: "", content: "" });

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
    // eslint-disable-next-line
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
    await axiosInstance.post(`/posts/${id}/hearts`, {
      memberId: member.memberId,
    });
    fetchPosts();
  };

  // 게시글 좋아요 취소
  const handleUnlike = async (id) => {
    await axiosInstance.delete(`/posts/${id}/hearts`, {
      data: { memberId: member.memberId },
    });
    fetchPosts();
  };

  return (
    <div>
      <h3>게시글 목록</h3>
      {(!board || posts.length === 0) && <div>게시글이 없습니다.</div>}
      <ul>
        {posts.map(post =>
          <li key={post.postId ?? post.id} style={{ marginBottom: 16, borderBottom: "1px solid #eee", paddingBottom: 8 }}>
            {editId === (post.postId ?? post.id) ? (
              <>
                <input
                  value={editForm.title}
                  onChange={e => setEditForm(f => ({ ...f, title: e.target.value }))}
                />
                <input
                  value={editForm.content}
                  onChange={e => setEditForm(f => ({ ...f, content: e.target.value }))}
                />
                <button onClick={() => handleEdit(post.postId ?? post.id)}>저장</button>
                <button onClick={() => setEditId(null)}>취소</button>
              </>
            ) : (
              <>
                <div style={{ fontWeight: "bold" }}>{post.title}</div>
                <div>{post.content}</div>
                <div>
                  <button onClick={() => { setEditId(post.postId ?? post.id); setEditForm({ title: post.title, content: post.content }); }}>수정</button>
                  <button onClick={() => handleDelete(post.postId ?? post.id)}>삭제</button>
                  <button onClick={() => handleLike(post.postId ?? post.id)}>좋아요</button>
                  <button onClick={() => handleUnlike(post.postId ?? post.id)}>좋아요 취소</button>
                  <span style={{ marginLeft: "1rem" }}>❤️ {post.heartCount || 0}</span>
                </div>
              </>
            )}
          </li>
        )}
      </ul>
    </div>
  );
}