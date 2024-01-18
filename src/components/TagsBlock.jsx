// import React from "react";
// import { Link } from "react-router-dom";

// import List from "@mui/material/List";
// import ListItem from "@mui/material/ListItem";
// import ListItemButton from "@mui/material/ListItemButton";
// import ListItemIcon from "@mui/material/ListItemIcon";
// import TagIcon from "@mui/icons-material/Tag";
// import ListItemText from "@mui/material/ListItemText";
// import Skeleton from "@mui/material/Skeleton";

// import { SideBlock } from "./SideBlock";

// const TagsBlock = ({ items, isLoading = true }) => {
//   return (
//     <SideBlock title="Теги">
//       <List>
//         {(isLoading ? [...Array(5)] : items).map((name, i) => (
//           <Link
//             key={i}
//             style={{ textDecoration: "none", color: "black" }}
//             to={`/tags/${name}`}
//           >
//             <ListItem key={i} disablePadding>
//               <ListItemButton>
//                 <ListItemIcon>
//                   <TagIcon />
//                 </ListItemIcon>
//                 {isLoading ? (
//                   <Skeleton width={100} />
//                 ) : (
//                   <ListItemText primary={name} />
//                 )}
//               </ListItemButton>
//             </ListItem>
//           </Link>
//         ))}
//       </List>
//     </SideBlock>
//   );
// };

// export default TagsBlock;

import React from "react";
import { Link } from "react-router-dom";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import TagIcon from "@mui/icons-material/Tag";
import ListItemText from "@mui/material/ListItemText";
import Skeleton from "@mui/material/Skeleton";

import { SideBlock } from "./SideBlock";

const TagsBlock = ({ items, isLoading = true }) => {
  // Використовуємо Set для зберігання унікальних тегів
  const uniqueTags = new Set(items);

  return (
    <SideBlock title="Теги">
      <List>
        {(isLoading ? [...Array(5)] : Array.from(uniqueTags)).map((name, i) => (
          <Link
            key={i}
            style={{ textDecoration: "none", color: "black" }}
            to={`/tags/${name}`}
          >
            <ListItem key={i} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <TagIcon />
                </ListItemIcon>
                {isLoading ? (
                  <Skeleton width={100} />
                ) : (
                  <ListItemText primary={name} />
                )}
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
      </List>
    </SideBlock>
  );
};

export default TagsBlock;
