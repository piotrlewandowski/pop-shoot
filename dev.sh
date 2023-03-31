#!/bin/bash

session='POP'

# create session
tmux new-session -d -s $session

# code
tmux rename-window -t 0 'code'
tmux send-keys -t $session:0 'nvim' C-m

# docker
tmux new-window -t $session:1 -n 'docker'
tmux send-keys -t $session:1 'docker-compose -f nginx.yaml up' C-m

# attach
tmux a
