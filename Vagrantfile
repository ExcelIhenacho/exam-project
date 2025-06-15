Vagrant.configure("2") do |config|
  config.vm.box = "ubuntu/focal64"
   config.vm.network "forwarded_port", guest: 80, host: 8080
  config.vm.synced_folder "./app", "/vagrant/app"

  config.vm.provision "shell", path: "provision.sh"

  config.vm.provider "virtualbox" do |vb|
    vb.customize ["modifyvm", :id, "--natdnshostresolver1", "on"]
    vb.customize ["modifyvm", :id, "--natdnsproxy1", "on"]
  end
end
