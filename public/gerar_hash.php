<?php
echo password_hash($_GET['senha'] ?? 'senha123', PASSWORD_DEFAULT);