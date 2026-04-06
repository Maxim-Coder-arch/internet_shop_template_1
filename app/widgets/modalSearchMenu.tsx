import { motion } from "framer-motion";
import { modalFilters } from "@/data/modalFilters.data";
import "../styles/widgets/modalSearchMenu.scss";
import Link from "next/link";

const ModalSearchMenu = () => {
  return (
    <motion.div 
    initial={{opacity: 0, height: 0}}
    animate={{opacity: 1, height: "650px"}}
    className="modal-menu-filteres">
      <div className="modal-search-sidebar">
        <ul>
          {
            modalFilters.map((filter, index) => {
              return (
                <Link key={index} href={filter.link}>
                  <li>{filter.label}</li>
                </Link>
              )
            })
          }
        </ul>
      </div>

      <div className="modal-search-goods">

      </div>
    </motion.div>
  )
}

export default ModalSearchMenu;