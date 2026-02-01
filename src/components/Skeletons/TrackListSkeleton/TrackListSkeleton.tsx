"use client";

import React from "react";
import styles from "./trackListSkeleton.module.css";

type Props = {
  rows?: number;
};

export default function TrackListSkeleton({ rows = 10 }: Props) {
  return (
    <div className={styles.list} aria-busy="true" aria-live="polite">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className={styles.row}>
          <div className={styles.colTrack}>
            <div className={`${styles.skeleton} ${styles.avatar}`} />
            <div className={styles.meta}>
              <div className={`${styles.skeleton} ${styles.lineLg}`} />
              <div className={`${styles.skeleton} ${styles.lineSm}`} />
            </div>
          </div>

          <div className={`${styles.skeleton} ${styles.colAuthor}`} />
          <div className={`${styles.skeleton} ${styles.colAlbum}`} />
          <div className={`${styles.skeleton} ${styles.colTime}`} />
        </div>
      ))}
    </div>
  );
}