pacman -Syu -y
pacman --sync sudo
useradd --create-home admin
passwd
# root - 1234
passwd admin
# admin - 1234
usermod -aG wheel admin
visudo
# uncomment Wheel stuff

sudo pacman -S base-devel
# for fakeroot



