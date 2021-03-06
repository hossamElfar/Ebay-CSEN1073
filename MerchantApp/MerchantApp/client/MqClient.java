package MerchantApp.client;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import MerchantApp.client.MqClient;
import MerchantApp.client.MqClientInitializer;
import MerchantApp.config.ApplicationProperties;
import io.netty.bootstrap.Bootstrap;
import io.netty.channel.Channel;
import io.netty.channel.ChannelFuture;
import io.netty.channel.EventLoopGroup;
import io.netty.channel.nio.NioEventLoopGroup;
import io.netty.channel.socket.nio.NioSocketChannel;

public class MqClient {
	private static final Logger log = LoggerFactory.getLogger(MqClient.class);
	static String HOST;
	static int PORT;

	
	public void init() {
		EventLoopGroup group = new NioEventLoopGroup();

		try {
			
			ApplicationProperties.readConfiguration("config.properties");
			HOST = ApplicationProperties.appHost;
			PORT = ApplicationProperties.appPort;
			
			log.info("MQClient connected to http" + "://127.0.0.1:" + PORT + '/');
			
			Bootstrap b = new Bootstrap();
			b.group(group).channel(NioSocketChannel.class).handler(new MqClientInitializer());

			// Start the connection attempt.
			ChannelFuture channelFuture = b.connect(HOST, PORT).sync();
			Channel ch = channelFuture.channel();
			ch.closeFuture().sync();
		} catch (InterruptedException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} finally {
			// The connection is closed automatically on shutdown.
			group.shutdownGracefully();
		}
	}
	public static void main(String[] args) {
		MqClient client = new MqClient();
		client.init();
	}
}