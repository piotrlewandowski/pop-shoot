#!/bin/bash

session_name='POP'

##### NEW SESSION
tmux new-session -d -s $session_name

# DOCKER
tmux rename-window -t 0 'nginx'
tmux send-keys -t $session_name:0 'docker-compose -f nginx.yaml up' C-m

# CODE
tmux new-window -t $session1:1 -n 'code'
tmux send-keys -t $session1:1 'nvim' C-m

# ATTACH
tmux a
