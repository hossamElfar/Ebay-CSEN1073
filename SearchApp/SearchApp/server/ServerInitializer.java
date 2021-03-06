package SearchApp.server;


import SearchApp.client.MqSender;
import io.netty.channel.ChannelInitializer;
import io.netty.channel.ChannelPipeline;
import io.netty.channel.socket.SocketChannel;
import io.netty.handler.codec.http.cors.CorsConfig;
import io.netty.handler.codec.json.JsonObjectDecoder;
import io.netty.handler.codec.string.StringDecoder;
import io.netty.handler.codec.string.StringEncoder;
import io.netty.handler.ssl.SslContext;
import SearchApp.server.Controller;
import SearchApp.server.ServerHandler;
import io.netty.handler.codec.DelimiterBasedFrameDecoder;
import io.netty.handler.codec.Delimiters;

public class ServerInitializer extends ChannelInitializer<SocketChannel> {
    
    protected final Controller    _controller;
    
	private final MqSender _mqSender;


    public ServerInitializer( Controller controller, MqSender sender) {
        _controller   =   controller;
        _mqSender = sender;
    }

    @Override
    public void initChannel(SocketChannel socChannel) {
    
        CorsConfig corsConfig = CorsConfig.withAnyOrigin().build();
     
        ChannelPipeline pipeLine = socChannel.pipeline( );

        pipeLine.addLast( new DelimiterBasedFrameDecoder(8192, Delimiters.lineDelimiter()));
        pipeLine.addLast(new StringDecoder());
        pipeLine.addLast(new StringEncoder());
        pipeLine.addLast("2", new ServerHandler( _controller ) );
        

    }
}