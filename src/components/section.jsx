import React from "react";

// Example icon as SVG. You can replace this with any icon or image.
const DefaultIcon = ({ size = 32 }) => (
  <svg
    height={size}
    width={size}
    viewBox="0 0 24 24"
    fill="green"
    style={{ marginRight: 12 }}
  >
    <circle cx="12" cy="12" r="10" fill="#fff" stroke="green" strokeWidth="2" />
    <text
      x="12"
      y="16"
      textAnchor="middle"
      fontSize="14"
      fill="green"
      fontWeight="bold"
    >
      i
    </text>
  </svg>
);

const ICON_COL_WIDTH = 44; // icon size (32) + marginRight (12)
const DOT_COL_WIDTH = ICON_COL_WIDTH;

const Section = ({
  icon = <DefaultIcon />,
  title,
  items = [],
  itemType = "Subject", // or "Position"
  itemTitleKey = "title",
  itemSubtitleKey = "subtitle",
  itemDateKey = "date",
  itemDescKey = "desc",
}) => (
  <section style={{ margin: "32px 0" }}>
    {/* Header */}
    <div style={{ display: "flex", alignItems: "center", marginBottom: 16 }}>
      <div style={{ width: ICON_COL_WIDTH, display: "flex", justifyContent: "center" }}>
        {icon}
      </div>
      <h2 style={{ margin: 0, color: "green", fontSize: 32, marginLeft: 8 }}>
        {title}
      </h2>
    </div>
    {/* Timeline */}
    <div style={{ position: "relative" }}>
      {/* Vertical timeline line */}
      <div
        style={{
          position: "absolute",
          left: ICON_COL_WIDTH + 24, // aligns with center of icon
          top: 0,
          bottom: 0,
          width: 3,
          background: "#4CAF50",
          zIndex: 0,
        }}
      />
      {items.map((item, idx) => (
        <div
          key={idx}
          style={{
            display: "flex",
            alignItems: "flex-start",
            marginBottom: 32,
            minHeight: 56,
            position: "relative",
            zIndex: 1,
          }}
        >
          {/* Left: Date and Title (left-aligned) */}
          <div
            style={{
              width: ICON_COL_WIDTH + 24,
              textAlign: "left",
              paddingRight: 12,
              color: "#888",
              fontSize: 13,
              flexShrink: 0,
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              justifyContent: "flex-start",
              marginTop: 2,
              lineHeight: 1.4,
            }}
          >
            <span style={{ fontWeight: "bold", color: "#888", fontSize: 14 }}>
              {itemType}
            </span>
            <span>{item[itemDateKey]}</span>
          </div>
          {/* Center: Timeline Dot */}
          <div
            style={{
              width: 32,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              position: "relative",
              minHeight: 56,
              zIndex: 2,
            }}
          >
            <span
              style={{
                width: 16,
                height: 16,
                background: "#fff",
                border: "4px solid #4CAF50",
                borderRadius: "50%",
                display: "inline-block",
                marginTop: 4,
              }}
            />
          </div>
          {/* Right: Main content */}
          <div style={{ flex: 1, paddingLeft: 4 }}>
            <div
              style={{
                fontWeight: "bold",
                color: "#1a7f37",
                fontSize: 18,
                marginBottom: 2,
              }}
            >
              {item[itemSubtitleKey]}
            </div>
            <div style={{ fontSize: 13, color: "#444", margin: 0 }}>
              {item[itemDescKey]}
            </div>
          </div>
        </div>
      ))}
    </div>
  </section>
);

export default Section;