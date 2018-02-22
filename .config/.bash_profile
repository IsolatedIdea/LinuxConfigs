#
# ~/.bash_profile
#


export PS1="\[\e[31m\]\d\[\e[m\]|\[\e[31m\]\t\[\e[m\]|\[\e[32m\]Git Status: \[\e[m\]\[\e[32m\]\`parse_git_branch\`\n\[\033[38;5;243m\]pwd: \w\[\e[m\]\[\e[34m\]\n\\[\e[m\]\[\e[33m\]\u\[\e[m\]\[\e[33m\]@\[\e[m\]\[\e[33m\]\h\[\e[m\]:"


[[ -f ~/.bashrc ]] && . ~/.bashrc

if [ -f ~/.bashrc ]; then
    . ~/.bashrc
fi
