@@ .. @@
               <li onClick={() => navigateTo(Screen.LOG)}>
                 <a className={currScreen === Screen.LOG ? 'active' : ''}>
                   <FontAwesomeIcon icon={faBug} /> Debug log
                 </a>
               </li>
-              <li>
-                <a
-                  href="https://github.com/ngxson/wllama"
-                  target="_blank"
-                  rel="noopener"
-                >
-                  <FontAwesomeIcon icon={faArrowUpRightFromSquare} /> Github
-                </a>
-              </li>
             </ul>