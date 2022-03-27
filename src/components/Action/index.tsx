import { MoreVert } from "@mui/icons-material";
import { IconButton, Menu, MenuItem } from "@mui/material";
import { useEffect, useState } from "react";

interface IActionProps {
  menuElements: { label: string; callback: (id: string) => {} | void }[];
  id?: string;
}

export const ActionBtn: React.FC<IActionProps> = ({ menuElements, id }) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [open, setOpen] = useState<boolean>(false);
  useEffect(() => {
    const ref = (e: MouseEvent) => {
      if (!(e.target as HTMLElement).closest(`#basic-button${id}`)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", ref);
    return () => {
      document.removeEventListener("mousedown", ref);
    };
  });
  return (
    <>
      <IconButton
        id={`basic-button${id}`}
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={(e) => {
          setOpen(!open);
          setAnchorEl(e.currentTarget);
        }}
      >
        <MoreVert color="secondary" />
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        MenuListProps={{
          "aria-labelledby": `basic-button${id}`,
        }}
      >
        {menuElements.map((element) => (
          <MenuItem onClick={() => element.callback(id || "")}>
            {element.label}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};
